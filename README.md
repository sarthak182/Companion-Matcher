# Companion-Matcher

A MERN web app that matches users based on shared interests. Users can approve/reject suggested companions and view their shortlisted/rejected profiles.

---

## 🛠️ Setup Instructions

### Prerequisites:
- Node.js & npm
- MongoDB running locally

### Clone and Run:
```bash
git clone https://github.com/sarthak182/Companion-Matcher.git
cd Companion-Matcher

# Start Backend
cd backend
npm install
node server.js

# Start Frontend
cd frontend
npm install
npm start

Additional API Summary
1) POST /users/submit
Submit user profile.
Input:
{
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com",
  "interests": ["music", "books"]
}
Response:
{ "message": "User profile submitted successfully" }

2)GET /users/candidates/:email
Get matching candidates.
Response:
[
  {
    "name": "Bob",
    "age": 26,
    "email": "bob@example.com",
    "commonInterests": ["music"]
  }
]
