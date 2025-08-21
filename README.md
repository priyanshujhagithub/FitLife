# 💪 FitLife — Your Ultimate Workout Companion

![FitLife Banner](assets/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

---

## 🌟 About
FitLife is a modern, full-stack workout app that helps you:
- 🔐 Securely register & log in
- 📊 Track exercises, sets, reps, and session duration
- 📅 View a history of all your workout sessions
- 🏋️‍♂️ Organize your fitness journey with a beautiful, responsive UI

---

## ✨ Features
- **User Authentication** (Register, Login, Logout, JWT protection)
- **Workout Session Management** (Add, List, View sessions)
- **Session Details** (Track sets, reps, duration, and type)
- **Progress Dashboard** (View all previous sessions)
- **Responsive Design** (Mobile & Desktop ready)
- **Modern Color Palette** (Dark backgrounds, bold accents)
- **Error Handling** (User-friendly messages)

---

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios, CSS Modules
- **Backend:** Node.js, Express, Mongoose (MongoDB)
- **Auth:** JSON Web Tokens (JWT), bcryptjs, cookie-parser
- **Testing & Docs:** Postman

---

## 📸 Demo Screenshots

<div align="center">
  <img src="assets/d1.png" alt="View" width="50%" />
  <img src="assets/d2.png" alt="View" width="50%" />
  <img src="assets/d3.png" alt="View" width="50%" />
  <img src="assets/d4.png" alt="View" width="50%" />
  <img src="assets/d5.png" alt="View" width="50%" />
  <img src="assets/d6.png" alt="View" width="50%" />
  <img src="assets/d7.png" alt="View" width="50%" />
  <img src="assets/d8.png" alt="View" width="50%" />
</div>

---

## 🏁 Getting Started

### Prerequisites
- **Node.js** ≥ v14
- **npm** or **yarn**
- **MongoDB Atlas** account & cluster
- **.env** file with your MongoDB URI and JWT secret

### Installation
```bash
# Clone the repo
$ git clone https://github.com/yourusername/fitlife.git
$ cd fitlife

# Install backend dependencies
$ cd "server"
$ npm install

# Install frontend dependencies
$ cd "../client"
$ npm install
```

### Environment Setup

#### Backend (.env file in server directory)
```bash
# Copy the example file
cp server/env.example server/.env

# Edit with your values
PORT=3001
NODE_ENV=development
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
```

#### Frontend (.env file in client directory)
```bash
# Copy the example file
cp client/env.example client/.env

# Edit with your values
REACT_APP_API_URL=http://localhost:3001
```

### Running the App
```bash
# Start the backend
$ cd "server"
$ npm run dev

# In a new terminal, start the frontend
$ cd "../client"
$ npm start
```

## 🔗 API Endpoints
| Method | Endpoint                        | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/auth/register`                | Register a new user                |
| POST   | `/auth/login`                   | Login and receive JWT cookie       |
| POST   | `/auth/logout`                  | Logout (clear cookie)              |
| POST   | `/auth/me`                      | Check authentication status        |
| POST   | `/api/exercises/add`            | Add a new workout session          |
| GET    | `/api/exercises/my`             | Get all sessions for the user      |
| GET    | `/`                             | Get the list of available exercises|
| GET    | `/health`                       | Health check endpoint              |

---

## 📁 Folder Structure
```
GYM/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── assets/
│   └── banner.png
└── README.md
```

## 📞 Contact

- **Author:** Samriddh Diwan & Priyanshu Jha
- **Project Link:** [https://github.com/yourusername/fitlife](https://github.com/yourusername/fitlife)

---

> Made with ❤️ for fitness enthusiasts everywhere!
