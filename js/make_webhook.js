// js/make_webhook.js

const BACKEND_API_URL = "https://maatritvaivffertilitybackend-production.up.railway.app/api/v1/automation/form-submission";

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

            try {
                // Submit form directly to the secure NestJS backend
                const response = await fetch(BACKEND_API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert("Thank you! Your details have been submitted successfully.");
                    form.reset();
                } else {
                    const errData = await response.json().catch(() => ({}));
                    console.error("Backend submission failed.", errData);
                    alert("There was an issue submitting your form to our automations. Please try again or call us.");
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
