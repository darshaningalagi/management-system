<<<<<<< HEAD
# management-system
=======
# Student Teacher Management System

A full-stack Student Teacher Management System built with JavaScript, Node.js, Express, MongoDB, HTML, CSS, and vanilla JavaScript. This system allows managing students and teachers with features including user authentication, CRUD operations, and role-based access control.

---

## Features

- User registration and login with JWT authentication
- Add, view, update, and delete student records
- Add, view, update, and delete teacher records
- Protected API routes accessible only to authenticated users
- Responsive and user-friendly frontend interface
- Separation of frontend and backend for scalability
- Ready for deployment with environment configuration

---

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JSON Web Tokens (JWT) for authentication
  - bcryptjs for password hashing

- Frontend:
  - HTML5, CSS3
  - JavaScript (vanilla)
  - Fetch API for asynchronous calls

---

## Project Structure


---

## Installation and Setup

### Prerequisites

- Node.js and npm installed
- MongoDB Atlas account or MongoDB installed locally

### Backend Setup

1. Navigate to the `backend` folder:


2. Install dependencies:


3. Create a `.env` file in `backend` directory with the following variables:


4. Start the backend server:


The server will run on `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the `frontend` folder.
2. Open `index.html` in a browser (or use a simple HTTP server like `Live Server` or `http-server`).
3. Update the API base URL in `frontend/js/app.js` if backend is hosted elsewhere:


---

## Usage

- Register a new user or login with existing credentials.
- Use the interface to add, update, or delete student and teacher records.
- Only authenticated users can access management features.
- Logout to end the session.

---

## Deployment

- Deploy backend on hosting platforms like Heroku, Render, or DigitalOcean.
- Deploy frontend as static site on Netlify, Vercel, or GitHub Pages.
- Update API URLs in frontend accordingly.

---

## Future Enhancements

- Role-based access control (admin vs. teacher)
- Enhanced UI with React, Vue, or UI frameworks
- Pagination and search for large data
- Notifications and alerts
- Tests and CI/CD integration

---

## License

This project is open source and free to use under the MIT License.

---

## Author

Darshan ingalagi

---

Thank you for using the Student Teacher Management System!
>>>>>>> 3580295 (Initial commit - full Student Teacher Management System project)
