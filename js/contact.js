// js/contact.js

// Import createClient directly. This only works because index.html loads contact.js as a module.
// Note: This import may be redundant if the code from step 1 is used, but it's the correct
// pattern for a true module environment. We will rely on the global assignment from Step 1.

const SUPABASE_URL = "https://gxtzhojshtcxtmqtobai.supabase.co";
// Note: process.env.SUPABASE_KEY is for Node environments. We use your ANON key here.
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHpob2pzaHRjeHRtcXRvYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTI5NjgsImV4cCI6MjA3NTIyODk2OH0.vu3TynNWVUzbM66taJapM3bPDCb3PB4dpXh44oUydqg";
// We use the global function created in index.html to initialize the client.
console.log("Initializing Supabase client using module approach...");

if (typeof window.createSupabaseClient !== "function") {
  console.error(
    "FATAL: Supabase module failed to load 'createClient' function."
  );
  alert("Connection failed. Check console for details.");
  // We cannot proceed if the client creation function is missing.
}

const supabase = window.createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client created successfully.");

// ----------------------------------------------------
// Form Submission Logic (Simplified and Cleaned)
// ----------------------------------------------------

const contactForm = document.getElementById("contactForm");

// This check is necessary because module scripts run before the DOM is fully ready.
if (contactForm) {
  const SUBMIT_BUTTON = contactForm.querySelector('button[type="submit"]');

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firstnameValue = document.getElementById("firstname").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    if (!firstnameValue || !emailValue) {
      alert("Please fill in First Name and Email.");
      return;
    }

    SUBMIT_BUTTON.disabled = true;
    const originalText = SUBMIT_BUTTON.textContent;
    SUBMIT_BUTTON.textContent = "Submitting...";

    const formData = {
      firstname: firstnameValue,
      email: emailValue,
      phone: document.getElementById("phone").value.trim() || null,
      gender: document.getElementById("gender").value.trim() || null,
      dateofbirth: document.getElementById("dateofbirth").value.trim() || null,
      department: document.getElementById("department").value.trim() || null,
      comments: document.getElementById("comments").value.trim() || null,
    };

    const { data, error } = await supabase
      .from("contactsubmissions")
      .insert([formData])
      .select();

    SUBMIT_BUTTON.disabled = false;
    SUBMIT_BUTTON.textContent = originalText;

    if (error) {
      console.error("Error inserting data:", error);
      if (error.message.includes("permission denied")) {
        alert("Submission failed: Permission Denied. Check RLS policies.");
      } else {
        alert("Submission failed: " + error.message);
      }
    } else {
      console.log("Data inserted successfully:", data);
      alert("Appointment request submitted successfully!");
      contactForm.reset();
    }
  });
} else {
  console.error("Form with id 'contactForm' NOT FOUND.");
}
