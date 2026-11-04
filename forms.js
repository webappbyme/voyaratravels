/* ============ VOYARA TRAVELS — FORMS.JS ============ */

/* NOTE ON EMAIL SUBMISSION:
   For a college project, the standard approach is client-side validation + confirmation.
   To actually send emails, integrate a service like Formspree (formspree.io),
   EmailJS (emailjs.com), or a backend endpoint. Instructions are included in README.md.
   The forms below validate client-side and display confirmation feedback.
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- HELPER: Show / Clear errors ---------- */
  function setError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }

  function clearError(id) {
    const el = document.getElementById(id);
    if (el) el.textContent = '';
  }

  function clearFormMessage(msgEl) {
    if (msgEl) {
      msgEl.textContent = '';
      msgEl.className = 'form-msg';
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[+\d\s\-()]{7,20}$/;

  /* ========== APPOINTMENT FORM ========== */
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const msgEl = document.getElementById('appointmentMsg');
      clearFormMessage(msgEl);

      const name = document.getElementById('apName').value.trim();
      const email = document.getElementById('apEmail').value.trim();
      const phone = document.getElementById('apPhone').value.trim();
      const date = document.getElementById('apDate').value;
      const message = document.getElementById('apMessage').value.trim();

      // Clear all
      ['errApName','errApEmail','errApPhone','errApDate','errApMessage'].forEach(clearError);

      if (name.length < 2) {
        setError('errApName', 'Please enter your full name.');
        valid = false;
      }
      if (!emailRegex.test(email)) {
        setError('errApEmail', 'Please enter a valid email address.');
        valid = false;
      }
      if (!phoneRegex.test(phone)) {
        setError('errApPhone', 'Please enter a valid phone number.');
        valid = false;
      }
      if (!date) {
        setError('errApDate', 'Please choose a preferred date.');
        valid = false;
      } else {
        const chosen = new Date(date + 'T00:00:00');
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosen < today) {
          setError('errApDate', 'Please choose a future date.');
          valid = false;
        }
      }
      if (message.length < 10) {
        setError('errApMessage', 'Please provide at least 10 characters about your travel plans.');
        valid = false;
      }

      if (valid) {
        // Simulated submission — replace with Formspree/EmailJS endpoint for actual sending.
        msgEl.textContent = '✅ Your appointment request has been received! Our team will contact you within 24 business hours to confirm availability.';
        msgEl.className = 'form-msg success';
        appointmentForm.reset();
      } else {
        msgEl.textContent = '⚠️ Please correct the errors above and try again.';
        msgEl.className = 'form-msg error-msg';
      }
    });
  }

  /* ========== CONTACT FORM ========== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;
      const msgEl = document.getElementById('contactMsg');
      clearFormMessage(msgEl);

      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const subject = document.getElementById('cSubject').value.trim();
      const message = document.getElementById('cMessage').value.trim();

      ['errCName','errCEmail','errCSubject','errCMessage'].forEach(clearError);

      if (name.length < 2) {
        setError('errCName', 'Please enter your full name.');
        valid = false;
      }
      if (!emailRegex.test(email)) {
        setError('errCEmail', 'Please enter a valid email address.');
        valid = false;
      }
      if (subject.length < 3) {
        setError('errCSubject', 'Please enter a subject.');
        valid = false;
      }
      if (message.length < 10) {
        setError('errCMessage', 'Please write at least 10 characters.');
        valid = false;
      }

      if (valid) {
        /* ----- ACTUAL EMAIL SUBMISSION -----
           To send real emails, create a free Formspree account:
           1. Go to https://formspree.io and create a form (e.g. hello@voyaratravels.com).
           2. Copy your endpoint: https://formspree.io/f/xxxxxxx
           3. Uncomment the fetch() code below and replace the URL.
        */

        /*
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, subject, message })
        }).then(response => {
          if (response.ok) {
            msgEl.textContent = '✅ Message sent successfully! We will reply within 24 hours.';
            msgEl.className = 'form-msg success';
            contactForm.reset();
          } else {
            throw new Error('Network error');
          }
        }).catch(() => {
          msgEl.textContent = '⚠️ Could not send right now. Please email hello@voyaratravels.com directly.';
          msgEl.className = 'form-msg error-msg';
        });
        */

        // Simulated confirmation for demo/college submission:
        msgEl.textContent = '✅ Thank you! Your message has been validated. (Demo mode: connect Formspree/EmailJS in forms.js for live email delivery. See README.md.)';
        msgEl.className = 'form-msg success';
        contactForm.reset();
      } else {
        msgEl.textContent = '⚠️ Please correct the errors above and try again.';
        msgEl.className = 'form-msg error-msg';
      }
    });
  }

});