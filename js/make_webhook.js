// js/make_webhook.js

const BACKEND_API_URL = "https://maatritvaivffertilitybackend-production.up.railway.app/api/v1/automation/form-submission";
const SUPABASE_URL = "https://gxtzhojshtcxtmqtobai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHpob2pzaHRjeHRtcXRvYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTI5NjgsImV4cCI6MjA3NTIyODk2OH0.vu3TynNWVUzbM66taJapM3bPDCb3PB4dpXh44oUydqg";

document.addEventListener("DOMContentLoaded", () => {
    // Initialize Supabase client if not already initialized
    let supabaseClient;
    if (typeof supabase !== 'undefined' && supabase.createClient) {
        supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }

    const forms = document.querySelectorAll(".make-lead-form");

    forms.forEach(form => {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.textContent : "Submit";
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Submitting...";
            }

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // Map form fields to Supabase table columns
            const supabaseData = {
                id: crypto.randomUUID(),
                fullname: data.name || null,
                emailaddress: data.email || null,
                phonenumber: data.contact_number || null,
                additionalnotes: data.issue || null,
                source_page: window.location.pathname,
                supabase_saved: true,
                make_sent: false
            };

            try {
                // 1. Save to Supabase
                if (supabaseClient) {
                    const { error: supabaseError } = await supabaseClient
                        .from("form_submissions")
                        .insert([supabaseData]);

                    if (supabaseError) {
                        console.error("Supabase submission failed:", supabaseError);
                    } else {
                        console.log("Data saved to Supabase successfully.");
                    }
                } else {
                    console.error("Supabase client not initialized. Make sure supabase.min.js is included.");
                }

                // 2. Submit form to the NestJS backend (optional, but kept for compatibility)
                const response = await fetch(BACKEND_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok || (supabaseClient && !supabaseError)) {
                    // Show success if either backend or supabase succeeded
                    alert("Thank you! Your details have been submitted successfully.");
                    form.reset();
                    
                    // Trigger success UI if exists (like in best_ivf_centre_in_kolkata.html)
                    const formContent = form.closest('.form-card')?.querySelector('.form-content');
                    const formSuccess = form.closest('.form-card')?.querySelector('.form-success');
                    if (formContent && formSuccess) {
                        formContent.style.display = 'none';
                        formSuccess.style.display = 'block';
                    }
                } else {
                    const errData = await response.json().catch(() => ({}));
                    console.error("Backend submission failed.", errData);
                    alert("There was an issue submitting your form. Please try again or call us.");
                }

            } catch (error) {
                console.error("Submission error:", error);
                alert("There was a network error. Please try again or contact us directly.");
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            }
        });
    });
});
