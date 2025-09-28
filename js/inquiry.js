// js/inquiry.js - Handles submission for the generalinquiries form

const SUPABASE_URL = "https://uuidrwjzdbqzgightlwc.supabase.co";
// Your existing ANON key
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aWRyd2p6ZGJxemdpZ2h0bHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNDQyNjAsImV4cCI6MjA3NDYyMDI2MH0.UJhYnG6GniyWvEZ9vt-wbCzHrWjiHB6Dw1dxBMEnj3E";

// We use the global function created in index.html to initialize the client.
console.log(
  "Initializing Supabase client using module approach for General Inquiries..."
);

if (typeof window.createSupabaseClient !== "function") {
  console.error(
    "FATAL: Supabase module failed to load 'createClient' function."
  );
  alert("Connection failed. Check console for details.");
}

const supabase = window.createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log("Supabase client created successfully.");

// ----------------------------------------------------
// Form Submission Logic
// ----------------------------------------------------

// IMPORTANT: Ensure your HTML form tag has id="inquiryForm"
const inquiryForm = document.getElementById("inquiryForm");

if (inquiryForm) {
  // We assume the submit button is the one with type="submit" inside the form
  const SUBMIT_BUTTON = inquiryForm.querySelector('button[type="submit"]');

  inquiryForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // --- 1. Get Values (Mapping HTML IDs to SQL Columns) ---

    const nameValue = document.getElementById("name").value.trim();
    const emailValue = document.getElementById("email").value.trim(); // --- 2. Validation (Require Name and Email) ---
    if (!nameValue || !emailValue) {
      alert("Please fill in your Name and Email.");
      return;
    } // --- 3. Disable Button & Prepare Data ---

    SUBMIT_BUTTON.disabled = true;
    const originalText = SUBMIT_BUTTON.textContent;
    SUBMIT_BUTTON.textContent = "Sending..."; // Map HTML IDs to the new SQL column names (snake_case used in table)

    const formData = {
      yourname: nameValue,
      youremail: emailValue,
      yourphone: document.getElementById("phone").value.trim() || null,
      yourproblem: document.getElementById("project").value.trim() || null, // Mapped 'project' ID to 'yourproblem' column
      subject: document.getElementById("subject").value.trim() || null,
      message: document.getElementById("message").value.trim() || null,
    }; // --- 4. Supabase Insertion ---

    const { data, error } = await supabase
      .from("generalinquiries") // TARGET TABLE
      .insert([formData])
      .select(); // --- 5. Re-enable Button & Handle Response ---

    SUBMIT_BUTTON.disabled = false;
    SUBMIT_BUTTON.textContent = originalText;

    if (error) {
      console.error("Error inserting data:", error);
      if (error.message.includes("permission denied")) {
        alert(
          "Submission failed: Permission Denied. Check RLS policies for 'generalinquiries'."
        );
      } else {
        alert("Submission failed: " + error.message);
      }
    } else {
      console.log("Data inserted successfully:", data);
      alert("Inquiry sent successfully! We will contact you soon.");
      inquiryForm.reset();
    }
  });
} else {
  console.error(
    "Form with id 'inquiryForm' NOT FOUND. Cannot attach listener."
  );
}
