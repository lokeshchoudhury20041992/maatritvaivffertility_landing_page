// js/callback.js - Handles submission for the callbackrequests form

const SUPABASE_URL = "https://uuidrwjzdbqzgightlwc.supabase.co";
// Your existing ANON key
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aWRyd2p6ZGJxemdpZ2h0bHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNDQyNjAsImV4cCI6MjA3NDYyMDI2MH0.UJhYnG6GniyWvEZ9vt-wbCzHrWjiHB6Dw1dxBMEnj3E";

// We use the global function created in index.html to initialize the client.
console.log("Initializing Supabase client using module approach...");

if (typeof window.createSupabaseClient !== "function") {
  console.error(
    "FATAL: Supabase module failed to load 'createClient' function."
  );
  alert("Connection failed. Check console for details.");
}

// Initialize Supabase client
const supabase = window.createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client created successfully.");

// ----------------------------------------------------
// Form Submission Logic
// ----------------------------------------------------

// Ensure your HTML form tag has id="callbackForm"
const callbackForm = document.getElementById("callbackForm");

// This check is necessary because module scripts run before the DOM is fully ready.
if (callbackForm) {
  // We assume the submit button is the one with type="submit" inside the form
  const SUBMIT_BUTTON = callbackForm.querySelector('button[type="submit"]');

  callbackForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // --- 1. Get Values ---

    const fullNameValue = document.getElementById("name").value.trim();
    const emailAddressValue = document.getElementById("email").value.trim();
    // Handle the select elements and optional fields
    const serviceValue = document.getElementById("service").value;
    const timeSlotValue = document.getElementById("time").value;

    // --- 2. Validation ---
    if (!fullNameValue || !emailAddressValue) {
      alert("Please fill in Full Name and Email Address.");
      return;
    }

    // --- 3. Disable Button & Prepare Data ---
    SUBMIT_BUTTON.disabled = true;
    const originalText = SUBMIT_BUTTON.textContent;
    SUBMIT_BUTTON.textContent = "Submitting..."; // Map HTML IDs to SQL column names

    const formData = {
      fullname: fullNameValue,
      emailaddress: emailAddressValue,
      phonenumber: document.getElementById("phone").value.trim() || null,
      serviceordoctor:
        (serviceValue === "Select a Service" ? null : serviceValue) || null,
      preferreddate: document.getElementById("date").value.trim() || null,
      preferredtimeslot:
        (timeSlotValue === "Select Time Slot" ? null : timeSlotValue) || null,
      additionalnotes: document.getElementById("message").value.trim() || null,
    }; // --- 4. Supabase Insertion ---

    const { data, error } = await supabase
      .from("callbackrequests") // TARGET TABLE
      .insert([formData])
      .select();

    // --- 5. Re-enable Button & Handle Response ---
    SUBMIT_BUTTON.disabled = false;
    SUBMIT_BUTTON.textContent = originalText;

    if (error) {
      console.error("Error inserting data:", error);
      if (error.message.includes("permission denied")) {
        alert(
          "Submission failed: Permission Denied. Check RLS policies for 'callbackrequests'."
        );
      } else {
        alert("Submission failed: " + error.message);
      }
    } else {
      console.log("Data inserted successfully:", data);
      alert("Callback request submitted successfully!");
      callbackForm.reset();
    }
  });
} else {
  console.error(
    "Form with id 'callbackForm' NOT FOUND. Cannot attach listener."
  );
}
