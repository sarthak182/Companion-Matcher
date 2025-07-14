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

```
### Additional API Summary
### 1) POST /users/submit
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

### 2)GET /users/candidates/:email
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
### Sample Screenshots
### Creating a user
<img width="1920" height="935" alt="Screenshot (640)" src="https://github.com/user-attachments/assets/a2ac38de-4197-4962-bb5c-c90502b25d94" />

### Showing similar candidates
<img width="1920" height="922" alt="Screenshot (644)" src="https://github.com/user-attachments/assets/99ae1fb4-4999-4403-9d06-514f8e7151e2" />

### Note:
Kindly refer to the screenshots folder in the repository to view additional images of the working application.
