import React, { useState, useEffect } from 'react';
import "../styles/table.css";
function LikedCandidates() {
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("email");

  const fetchLiked = async () => {
    try {
      const res = await fetch(`http://localhost:5000/users/liked/${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setLiked(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching liked candidates:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiked();
  }, []);

  const handleClear = async (targetEmail) => {
    const confirmClear = window.confirm("Are you sure you want to remove this user from your liked list?");if (!confirmClear) return;
    try {
      const res = await fetch(`http://localhost:5000/users/clear-like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, targetEmail }),
      });
      const data = await res.json();
      if (data.message) {
        setLiked(prev => prev.filter(user => user.email !== targetEmail));
      }
    } catch (err) {
      console.error('Error clearing like:', err);
    }
  };

  if (loading) return <p>Loading shortlisted candidates...</p>;
  if (liked.length === 0) return <p>No candidates shortlisted yet.</p>;

  return (
    <div>
      <h2>Shortlisted Candidates</h2>
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
    {liked.map((user, index) => (
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

export default LikedCandidates;
