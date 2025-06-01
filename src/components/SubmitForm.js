import React, { useState, useEffect } from 'react';
import './SubmitForm.css';

const SubmitForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', title: '', body: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [storedSubmissions, setStoredSubmissions] = useState([]);

  useEffect(() => {
    const existing = JSON.parse(localStorage.getItem('submissions') || '[]');
    setStoredSubmissions(existing);
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Email is invalid';
    }
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.body.trim()) errs.body = 'Body is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newSubmission = { ...formData, id: Date.now() };
    const existing = JSON.parse(localStorage.getItem('submissions') || '[]');
    const updated = [...existing, newSubmission];
    localStorage.setItem('submissions', JSON.stringify(updated));
    setStoredSubmissions(updated);

    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', title: '', body: '' });
      setErrors({});
    }, 1000);
  };

  const handleDelete = (id) => {
    const updated = storedSubmissions.filter(sub => sub.id !== id);
    setStoredSubmissions(updated);
    localStorage.setItem('submissions', JSON.stringify(updated));
  };

  if (submitted) {
    return (
      <>
        <p className="thank-you">Thank you for submitting your lore!</p>
        <h3>Previously Submitted lore:</h3>
        {storedSubmissions.length === 0 && <p>No submissions yet.</p>}
        <ul>
          {storedSubmissions.map(sub => (
            <li key={sub.id}>
              <strong>{sub.title}</strong> by {sub.name}<br/>
              Body:{sub.body} <br />
              <button onClick={() => handleDelete(sub.id)} className="delete-btn">Delete</button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <form className="submit-form" onSubmit={handleSubmit} noValidate>
        <label>
          Name
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </label>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </label>
        <label>
          Title
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          Body
          <textarea name="body" rows="5" value={formData.body} onChange={handleChange} />
          {errors.body && <span className="error">{errors.body}</span>}
        </label>
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      <h3>Previously submitted lore:</h3>
      {storedSubmissions.length === 0 && <p>No submissions yet.</p>}
      <ul>
        {storedSubmissions.map(sub => (
          <li key={sub.id}>
            <strong>{sub.title}</strong> by {sub.name} <br />
            {sub.body} <br />
            <button onClick={() => handleDelete(sub.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SubmitForm;
