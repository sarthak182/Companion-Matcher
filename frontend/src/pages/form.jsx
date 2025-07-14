import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import "../styles/form.css";
function Form() {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [interestInput, setInterestInput] = useState('');
  const [interests, setInterests] = useState([]);

  const handleAddInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim().toLowerCase())) {
      setInterests([...interests, interestInput.trim().toLowerCase()]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { name, email, age: Number(age), interests };
    const res = await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    alert(data.message || 'User added');
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
      <input type="email" placeholder="Email" required value={email} onChange={e => setEmail(e.target.value)} />
      <input type="number" placeholder="Age" required value={age} onChange={e => setAge(e.target.value)} />
      
      <label>Interests:</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Enter interest"
          value={interestInput}
          onChange={e => setInterestInput(e.target.value)}
        />
        <button type="button" onClick={handleAddInterest}>+</button>
      </div>

      <div>
        {interests.map((interest, index) => (
          <span key={index} style={{ marginRight: '10px' }}>
            {interest} <button type="button" onClick={() => handleRemoveInterest(interest)}>❌</button>
          </span>
        ))}
      </div>

      <button className="btn" type="submit">Create Profile</button>
      <button className="btn" onClick={()=>{navigate("/")}}>Existing User?</button>
    </form>
  );
}

export default Form;
