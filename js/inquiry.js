// js/inquiry.js - Handles submission for the generalinquiries form

// Load Supabase v2 client properly
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://gxtzhojshtcxtmqtobai.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHpob2pzaHRjeHRtcXRvYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTI5NjgsImV4cCI6MjA3NTIyODk2OH0.vu3TynNWVUzbM66taJapM3bPDCb3PB4dpXh44oUydqg";

console.log("Initializing Supabase client for General Inquiries...");

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client created successfully.");


// ----------------------------------------------------
// Form Submission Logic
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const inquiryForm = document.getElementById("inquiryForm");

  if (!inquiryForm) {
    console.error("Form with id 'inquiryForm' NOT FOUND. Cannot attach listener.");
    return;
  }

  const SUBMIT_BUTTON = inquiryForm.querySelector('button[type="submit"]');

  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // --- 1. Get Values ---
    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim();

    // --- 2. Validation ---
    if (!nameValue || !emailValue) {
      alert("Please fill in your Name and Email.");
      return;
    }

    // --- 3. Disable Button ---
    SUBMIT_BUTTON.disabled = true;
    const originalText = SUBMIT_BUTTON.textContent;
    SUBMIT_BUTTON.textContent = "Sending...";

    // --- 4. Prepare Data ---
    const formData = {
      yourname: nameValue,
      youremail: emailValue,
      yourphone: document.getElementById("phone").value.trim() || null,
      yourproblem: document.getElementById("project").value.trim() || null,
      subject: document.getElementById("subject").value.trim() || null,
      message: document.getElementById("message").value.trim() || null,
    };

    // --- 5. Insert into Supabase ---
    const { data, error } = await supabase
      .from("generalinquiries")
      .insert([formData])
      .select();

    // --- 6. Re-enable Button ---
    SUBMIT_BUTTON.disabled = false;
    SUBMIT_BUTTON.textContent = originalText;

    // --- 7. Handle Response ---
    if (error) {
      console.error("Error inserting data:", error);

      if (error.message.includes("permission denied")) {
        alert(
          "Submission failed: Permission Denied. Check RLS policies for 'generalinquiries'."
        );
      } else {
        alert("Submission failed: " + error.message);
      }

      return;
    }

    console.log("Data inserted successfully:", data);
    alert("Inquiry sent successfully! We will contact you soon.");
    inquiryForm.reset();
  });
});
