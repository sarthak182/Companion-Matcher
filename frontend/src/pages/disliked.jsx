import React, { useState, useEffect } from 'react';
import "../styles/table.css";
function DislikedCandidates() {
  const [disliked, setDisliked] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("email");

  const fetchDisliked = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/disliked/${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setDisliked(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching disliked candidates:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisliked();
  }, []);

  const handleClear = async (targetEmail) => {
    const confirmClear = window.confirm("Are you sure you want to remove this user from your disliked list?");
    if (!confirmClear) return;
    try {
      const res = await fetch(`http://localhost:5000/users/clear-dislike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, targetEmail }),
      });
      const data = await res.json();
      if (data.message) {
        setDisliked(prev => prev.filter(user => user.email !== targetEmail));
      }
    } catch (err) {
      console.error('Error clearing dislike:', err);
    }
  };

  if (loading) return <p>Loading rejected candidates...</p>;
  if (disliked.length === 0) return <p>No rejected candidates rejected yet.</p>;

  return (
    <div>
      <h2>Rejected Candidates</h2>
      <table className="styled-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Age</th>
      <th>Interests</th>
      <th>Clear</th>
    </tr>
  </thead>
  <tbody>
    {disliked.map((user, index) => (
      <tr key={index}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.age}</td>
        <td>{user.interests.join(', ')}</td>
        <td>
          <button
            onClick={() => handleClear(user.email)}
            className="btn-clear"
          >
            ❌
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
}

export default DislikedCandidates;
