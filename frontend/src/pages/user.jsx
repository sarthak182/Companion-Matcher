import React, { useState, useEffect } from 'react';
import '../styles/candidates.css'; // We'll add minimal styling here

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For popup

  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/candidates/${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setCandidates(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching candidates:', err);
      setLoading(false);
    }
  };

  const handleResponse = async (targetEmail, action) => {
    try {
      const res = await fetch(`http://localhost:5000/users/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, targetEmail, action }),
      });
      const data = await res.json();
      if (data.message) {
        setCandidates(prev => prev.filter(user => user.email !== targetEmail));
        setSelectedUser(null); // Close popup
      } else {
        alert(data.error || 'Something went wrong.');
      }
    } catch (err) {
      console.error('Error responding:', err);
    }
  };

  if (loading) return <p>Loading candidates...</p>;
  if (candidates.length === 0) return <p>No matching candidates found.</p>;

  return (
    <div>
      <h2>
        Matching Candidates for <span style={{ color: "teal" }}>{userEmail}</span>
      </h2>

      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Common Interests</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((user, index) => (
            <tr key={index} onClick={() => setSelectedUser(user)} style={{ cursor: 'pointer' }}>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.commonInterests.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
  <div className="candidates-popup-overlay">
    <div className="candidates-popup-modal">
      <h3>What would you like to do?</h3>
      <p><strong>{selectedUser.name}</strong>, Age {selectedUser.age}</p>
      <p>Common Interests: {selectedUser.commonInterests.join(', ')}</p>
      <div className="candidates-popup-buttons">
        <button className="candidates-btn-approve" onClick={() => handleResponse(selectedUser.email, 'like')}>✅ Approve</button>
        <button className="candidates-btn-reject" onClick={() => handleResponse(selectedUser.email, 'dislike')}>❌ Reject</button>
        <button className="candidates-btn-cancel" onClick={() => setSelectedUser(null)}>Cancel</button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Candidates;

