import React, { useState } from 'react';
import FooterMain from '../components/FooterMain';
// import { World as GithubGlobe } from '../components/GithubGlobe';
import './Contact.css';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    formData.append("access_key", "a7b0c097-9f32-4675-8c06-ebd65f0be824");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    

    // Fetch the response, then convert to JSON
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: json
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      e.target.reset(); // clear inputs
      setSubmitted(true);
      document.querySelector('.form-instructions').innerText = 'Thank you for reaching out! I will get back to you as soon as possible.'
      document.querySelector('.form-instructions').style = 'text-align: center;'
    } else {  
      console.log("Error!", data);
    }
  };

  return (
    <div>
      <div className="gradient contact"></div>
      {/* <h1 className="contact-title">Contact</h1> */}
      <h1>Contact</h1>
      <div className="contact-content">
        <div className="form-container">
          <div className="form-instructions">Have a question, proposal, or just want to say hello? Send me a message!</div>
          <form onSubmit={onSubmit} className="contact-form" action="https://formspree.io/f/moqyqzqz" method="POST">
            {!submitted && (
              <>
                <div className="name-input">
                  <label htmlFor="name">Full Name*</label>
                  <input type="text" id="name" name="name" placeholder="Enter your full name" required />
                </div>
                <div className="email-input">
                  <label htmlFor="email">Email*</label>
                  <input type="email" id="email" name="email_id" placeholder="Enter your email" required />
                </div>
                <div className="message-input">
                  <label htmlFor="message">Message*</label>
                  <textarea id="message" name="message" placeholder="Type your message" required data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
                </div>
              </>
            )}
            <div className="send-button">
              {loading ? (
                <span>
                  <svg className="spinner" viewBox="0 0 50 50" width="32" height="32" stroke="#fff" xmlns="http://www.w3.org/2000/svg">
                    <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
                    <style>{`
                      .spinner {
                        animation: rotate 2s linear infinite;
                      }
                      .path {
                        stroke-linecap: round;
                        animation: dash 1.5s ease-in-out infinite;
                      }
                      @keyframes rotate {
                        100% { transform: rotate(360deg); }
                      }
                      @keyframes dash {
                        0% { stroke-dasharray: 1, 150; stroke-dashoffset: 0; }
                        50% { stroke-dasharray: 90, 150; stroke-dashoffset: -35; }
                        100% { stroke-dasharray: 90, 150; stroke-dashoffset: -124; }
                      }
                    `}</style>
                  </svg>
                </span>
              ) : submitted ? (
                <span className="success-message"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-black dark:text-lime-500 opacity-100"><path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd"></path></svg> Message sent successfully!</span> 
              ) : (
                <button type="submit" value="Send">Submit →</button>
              )}
            </div>
          </form>
        </div>
        <div className="globe-container">
          {/* <GithubGlobe /> */}
        </div>
      </div>
      <FooterMain />
    </div>
  );
};

export default Contact;
