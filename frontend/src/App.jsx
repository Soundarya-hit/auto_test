import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/submit', formData);
      if (response.data.success) {
        setStatusMessage('✅ Form submitted and saved to database successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      }
    } catch (error) {
      console.error(error);
      setStatusMessage('❌ Error submitting form. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>User Submission Form</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label>Name:</label><br />
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label>Message:</label><br />
          <textarea 
            name="message" 
            value={formData.message} 
            onChange={handleChange} 
            required 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box', height: '80px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
      {statusMessage && <p style={{ marginTop: '15px', fontWeight: 'bold' }}>{statusMessage}</p>}
    </div>
  );
}

export default App;