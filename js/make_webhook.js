// js/make_webhook.js

const MAKE_WEBHOOK_URL = "https://hook.us1.make.com/YOUR_WEBHOOK_ID_HERE"; // <-- REPLACE WITH MAKE.COM WEBHOOK

// Supabase Configuration
const SUPABASE_URL = "https://gxtzhojshtcxtmqtobai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHpob2pzaHRjeHRtcXRvYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTI5NjgsImV4cCI6MjA3NTIyODk2OH0.vu3TynNWVUzbM66taJapM3bPDCb3PB4dpXh44oUydqg";

document.addEventListener("DOMContentLoaded", () => {
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

            // Supabase Field Mapping matching 'callbackrequests' table
            const supabaseData = {
                fullname: data.name || null,
                emailaddress: data.email || null,
                phonenumber: data.contact_number || null,
                serviceordoctor: data.issue || null,
                preferreddate: data.visit_date || null,
                preferredtimeslot: data.best_time_to_call || null,
                additionalnotes: `Pincode: ${data.pincode || 'N/A'} | Address: ${data.address || 'N/A'}`
            };

            try {
                // Run both Make.com and Supabase submissions concurrently
                const [makeResponse, supabaseResponse] = await Promise.allSettled([
                    // Make.com Request
                    fetch(MAKE_WEBHOOK_URL, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(data)
                    }),

                    // Supabase Request
                    fetch(`${SUPABASE_URL}/rest/v1/callbackrequests`, {
                        method: "POST",
                        headers: {
                            "apikey": SUPABASE_ANON_KEY,
                            "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
                            "Content-Type": "application/json",
                            "Prefer": "return=minimal" // Don't return the inserted row to save bandwidth
                        },
                        body: JSON.stringify(supabaseData)
                    })
                ]);

                // Check if at least one succeeded. Optionally, strictly require both.
                if (makeResponse.status === "fulfilled" && makeResponse.value.ok) {
                    alert("Thank you! Your details have been submitted successfully.");
                    form.reset();
                } else {
                    alert("There was an issue submitting your form to our automations. Please try again or call us.");
                }

                if (supabaseResponse.status === "rejected" || !supabaseResponse.value.ok) {
                    console.error("Supabase backup submission failed.", supabaseResponse);
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
