import React, { useEffect, useState } from 'react';
import './contact.css'; // Import your CSS file for styling

import axios from 'axios';

const ContactForm = () => {
 
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Print form data for debugging
    console.log('Form Data:', formData);
  
    try {
      const currentUserId = 2; // Replace with the actual current user ID
      await axios.post(`http://localhost:3001/datas/${currentUserId}`, formData);
      alert('Data submitted successfully!');
      // Reset the form fields after successful submission
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit data. Please try again.');
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='container'>
    <div className="myfooter">
      
      <div className="row">
        
        <div className="col-5  col_5">
          <h2>Contact</h2>
          <h4>Call Us</h4>
          <h6>+880254615566</h6>
          <h4>Email Us</h4>
          <h6>info@example.com</h6>
          <h4>Address</h4>
          <h6>20, 25 Dhaka, 0123 Ratrba baraj, 20</h6>
        </div>
        <div className="col-7 form" >
          <h2>Email</h2>
          <p>info@edindia.net</p>
          <h2>Write to us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <div className="row">
                <div className="col-md-6 col-12 mb-4">
                  <input
                    type="name"
                    name="name" value={formData.name} onChange={handleChange}
                    className="form-control"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlInput1"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="col-md-6 col-12 mb-4">
                  <input
                    type="email"
                    name="email" value={formData.email} onChange={handleChange}
                    className="form-control"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlInput1"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="col-md-12 col-12 mb-4">
                  <textarea
                  name="message" value={formData.message} onChange={handleChange}
                    className="form-control commentbox"
                    style={{ borderRadius: '10px' }}
                    id="exampleFormControlTextarea1"
                    placeholder="Message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="send_button" /*onClick={() => }*/ >
                  Send Request
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ContactForm;
