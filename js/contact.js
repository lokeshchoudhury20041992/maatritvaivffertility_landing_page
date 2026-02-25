// js/callback.js - Handles submission for the callbackrequests form

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://gxtzhojshtcxtmqtobai.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4dHpob2pzaHRjeHRtcXRvYmFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2NTI5NjgsImV4cCI6MjA3NTIyODk2OH0.vu3TynNWVUzbM66taJapM3bPDCb3PB4dpXh44oUydqg"; // add your ANON key here

console.log("Initializing Supabase client using ESM module...");

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client created successfully.");

// ----------------------------------------------------
// Form Submission Logic
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const callbackForm = document.getElementById("callbackForm");

  if (!callbackForm) {
    console.error("Form with id 'callbackForm' NOT FOUND.");
    return;
  }

  const SUBMIT_BUTTON = callbackForm.querySelector('button[type="submit"]');

  callbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // --- 1. Get Values ---
    const fullNameValue = document.getElementById("name").value.trim();
    const emailAddressValue = document.getElementById("email").value.trim();
    const serviceValue = document.getElementById("service").value;
    const timeSlotValue = document.getElementById("time").value;

    // --- 2. Validation ---
    if (!fullNameValue || !emailAddressValue) {
      alert("Please fill in Full Name and Email Address.");
      return;
    }

    // --- 3. Disable Button ---
    SUBMIT_BUTTON.disabled = true;
    const originalText = SUBMIT_BUTTON.textContent;
    SUBMIT_BUTTON.textContent = "Submitting...";

    // --- 4. Prepare Data ---
    const formData = {
      fullname: fullNameValue,
      emailaddress: emailAddressValue,
      phonenumber: document.getElementById("phone").value.trim() || null,
      serviceordoctor: serviceValue !== "Select a Service" ? serviceValue : null,
      preferreddate: document.getElementById("date").value.trim() || null,
      preferredtimeslot:
        timeSlotValue !== "Select Time Slot" ? timeSlotValue : null,
      additionalnotes: document.getElementById("message").value.trim() || null,
    };

    // --- 5. Insert into Supabase ---
    const { data, error } = await supabase
      .from("callbackrequests")
      .insert([formData])
      .select();

    // --- 6. Re-enable Button ---
    SUBMIT_BUTTON.disabled = false;
    SUBMIT_BUTTON.textContent = originalText;

    // --- 7. Handle Result ---
    if (error) {
      console.error("Error inserting data:", error);
      alert("Submission failed: " + error.message);
      return;
    }

    alert("Callback request submitted successfully!");
    callbackForm.reset();
  });
});
