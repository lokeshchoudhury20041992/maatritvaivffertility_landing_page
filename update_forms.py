import re

form_index_target = """            <form id="contactForm">
              <div class="row gy-3 gx-4">
                <div class="col-xl-6">
                  <input type="text" id="firstname" name="firstname" class="form-control py-3 bg-transparent text-white"
                    style="border-color: #9d539d;" placeholder="First Name" required>
                </div>
                <div class="col-xl-6">
                  <input type="email" id="email" name="email" class="form-control py-3 bg-transparent text-white"
                    style="border-color: #9d539d;" placeholder="Email" required>
                </div>
                <div class="col-xl-6">
                  <input type="tel" id="phone" name="phone" class="form-control py-3 bg-transparent text-white"
                    style="border-color: #9d539d;" placeholder="Phone">
                </div>
                <div class="col-xl-6">
                  <select id="gender" name="gender" class="form-select py-3 bg-transparent text-white"
                    style="border-color: #9d539d;" aria-label="Gender Select">
                    <option value="" selected>Your Gender</option>
                    <option value="Male" style="color: black;">Male</option>
                    <option value="Female" style="color: black;">Female</option>
                    <option value="Others" style="color: black;">Others</option>
                  </select>
                </div>
                <div class="col-xl-6">
                  <input type="date" id="dateofbirth" name="dateofbirth"
                    class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;">
                </div>
                <div class="col-xl-6">
                  <select id="department" name="department" class="form-select py-3 bg-transparent text-white"
                    style="border-color: #9d539d;" aria-label="Department Select">
                    <option value="" selected>Department</option>
                    <option value="Fertility" style="color: black;">Fertility</option>
                    <option value="Gynecology" style="color: black;">Gynecology</option>
                    <option value="Obstetrics" style="color: black;">Obstetrics</option>
                    <option value="Other" style="color: black;">Other</option>
                  </select>
                </div>
                <div class="col-12">
                  <textarea id="comments" name="comments" class="form-control bg-transparent text-white"
                    style="border-color: #9d539d;" rows="5" placeholder="Write Comments"></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn w-100 py-3 px-5"
                    style="background-color: #9d539d; color: white; border: 2px solid #9d539d; transition: all 0.3s ease;"
                    onmouseover="
              this.style.backgroundColor='white';
              this.style.color='black';
            " onmouseout="
              this.style.backgroundColor='#9d539d';
              this.style.color='white';
            ">SUBMIT NOW</button>
                </div>
              </div>
            </form>"""

form_index_replace = """            <form id="contactForm" class="make-lead-form">
              <div class="row gy-3 gx-4">
                <div class="col-xl-6">
                  <input type="text" id="name" name="name" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Your Name" required>
                </div>
                <div class="col-xl-6">
                  <input type="tel" id="phone" name="contact_number" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Contact Number" required>
                </div>
                <div class="col-xl-6">
                  <input type="email" id="email" name="email" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Email" required>
                </div>
                <div class="col-xl-6">
                  <input type="text" id="pincode" name="pincode" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Pincode" required>
                </div>
                <div class="col-xl-6">
                  <select id="best_time" name="best_time_to_call" class="form-select py-3 bg-transparent text-white" style="border-color: #9d539d;" required>
                    <option value="" selected disabled>Best Time to Call</option>
                    <option value="Morning" style="color: black;">Morning</option>
                    <option value="Afternoon" style="color: black;">Afternoon</option>
                    <option value="Evening" style="color: black;">Evening</option>
                  </select>
                </div>
                <div class="col-xl-6">
                  <input type="date" id="visit_date" name="visit_date" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Date of Visit" required>
                </div>
                <div class="col-12">
                  <input type="text" id="issue" name="issue" class="form-control py-3 bg-transparent text-white" style="border-color: #9d539d;" placeholder="Issue Calling For" required>
                </div>
                <div class="col-12">
                  <textarea id="address" name="address" class="form-control bg-transparent text-white" style="border-color: #9d539d;" rows="3" placeholder="Address" required></textarea>
                </div>
                <div class="col-12">
                  <button type="submit" class="btn w-100 py-3 px-5"
                    style="background-color: #9d539d; color: white; border: 2px solid #9d539d; transition: all 0.3s ease;"
                    onmouseover="this.style.backgroundColor='white'; this.style.color='black';"
                    onmouseout="this.style.backgroundColor='#9d539d'; this.style.color='white';">
                    SUBMIT NOW
                  </button>
                </div>
              </div>
            </form>"""

form_app_target = """            <form id="callbackForm">
              <div class="row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="name" placeholder="Your Name" />
                    <label for="name">Full Name</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="email" class="form-control" id="email" placeholder="Your Email" />
                    <label for="email">Email Address</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" id="phone" placeholder="Phone Number" />
                    <label for="phone">Phone Number</label>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-floating">
                    <select class="form-select" id="service">
                      <option selected>Select a Service</option>
                      <option value="Fertility Consultation">
                        Fertility Consultation
                      </option>
                      <option value="IVF/ICSI">IVF / ICSI</option>
                      <option value="IUI">IUI</option>
                      <option value="General Checkup">General Checkup</option>
                    </select>
                    <label for="service">Service / Doctor Selection</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="date" class="form-control" id="date" placeholder="Preferred Date" />
                    <label for="date">Preferred Date</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <select class="form-select" id="time">
                      <option selected>Select Time Slot</option>
                      <option value="Morning">Morning (9am - 12pm)</option>
                      <option value="Afternoon">Afternoon (1pm - 5pm)</option>
                      <option value="Evening">Evening (6pm - 8pm)</option>
                    </select>
                    <label for="time">Preferred Time</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Leave a message here" id="message"
                      style="height: 100px"></textarea>
                    <label for="message">Additional Notes (Optional)</label>
                  </div>
                </div>
                <div class="col-12">
                  <button class="btn btn-primary w-100 py-3" type="submit">
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </form>"""

form_app_replace = """            <form id="callbackForm" class="make-lead-form">
              <div class="row g-3">
                <div class="col-md-12">
                  <div class="form-floating">
                    <input type="text" class="form-control" name="name" id="name" placeholder="Your Name" required />
                    <label for="name">Full Name</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="tel" class="form-control" name="contact_number" id="phone" placeholder="Phone Number" required />
                    <label for="phone">Phone Number</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required />
                    <label for="email">Email Address</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" name="pincode" id="pincode" placeholder="Pincode" required />
                    <label for="pincode">Pincode</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <select class="form-select" name="best_time_to_call" id="time" required>
                      <option selected disabled value="">Select Time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                    </select>
                    <label for="time">Best Time to Call</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="date" class="form-control" name="visit_date" id="date" placeholder="Willing Date of Visit" required />
                    <label for="date">Willing Date of Visit</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating">
                    <input type="text" class="form-control" name="issue" id="issue" placeholder="Issue calling for" required />
                    <label for="issue">Issue Calling For</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating">
                    <textarea class="form-control" placeholder="Address" name="address" id="address" style="height: 100px" required></textarea>
                    <label for="address">Address</label>
                  </div>
                </div>
                <div class="col-12">
                  <button class="btn btn-primary w-100 py-3" type="submit">
                    Confirm Appointment
                  </button>
                </div>
              </div>
            </form>"""

# Replace index.html
with open('index.html', 'r', encoding='utf-8') as f:
    idx = f.read()

idx = idx.replace(form_index_target, form_index_replace)

# remove supabase script blocks
supabase_pattern = re.compile(r'<script type="module">\s*// Standard, clean import.*?window\.createSupabaseClient = createClient;\s*</script>', re.DOTALL)
idx = re.sub(supabase_pattern, '', idx)

# replace script src
idx = idx.replace('<script type="module" src="js/contact.js"></script>', '<script src="js/make_webhook.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(idx)


# Replace appointment.html
with open('appointment.html', 'r', encoding='utf-8') as f:
    app = f.read()

app = app.replace(form_app_target, form_app_replace)

app = re.sub(supabase_pattern, '', app)
app = app.replace('<script type="module" src="js/callback.js"></script>', '<script src="js/make_webhook.js"></script>')

with open('appointment.html', 'w', encoding='utf-8') as f:
    f.write(app)


# Replace contact.html
with open('contact.html', 'r', encoding='utf-8') as f:
    con = f.read()

con = re.sub(supabase_pattern, '', con)
con = con.replace('<script type="module" src="js/contact.js"></script>', '<script src="js/make_webhook.js"></script>')

with open('contact.html', 'w', encoding='utf-8') as f:
    f.write(con)

print("Done updating forms via script")
