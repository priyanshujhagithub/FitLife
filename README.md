# 💪 FitLife – Your Ultimate Workout Companion
# GYM Workout Tracker

![FitLife Banner](assets/banner.png)  
A comprehensive workout tracking application built with React, Node.js, and MongoDB.

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)  
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

---

## Features

### 🌟 About
FitLife is a modern, full-stack workout app that helps you:  
- 🔐 Securely register & log in  
- 🏋️ Track exercises, sets, reps, and session duration  
- 📊 View a history of all your workout sessions  
- 🎨 Organize your fitness journey with a beautiful, responsive UI  

### ✨ Features
- **User Authentication** (Register, Login, Logout, JWT protection)  
- **Workout Session Management** (Add, List, View sessions)  
- **Session Details** (Track sets, reps, duration, and type)  
- **Progress Dashboard** (View all previous sessions)  
- **Responsive Design** (Mobile & Desktop ready)  
- **Modern Color Palette** (Dark backgrounds, bold accents)  
- **Error Handling** (User-friendly messages)  

The delete functionality has been implemented with the following features:  
- **Delete Button** (on session card)  
- **Confirmation Dialog** (before deletion)  
- **Loading States** (spinner while deleting)  
- **Success Notification** (session deleted)  
- **Real-time Updates** (UI refresh after deletion)  

---

## 📸 Demo Screenshots

<div align="center">
  <img src="assets/d1.png" alt="View" width="75%" />
  <img src="assets/d2.png" alt="View" width="75%" />
  <img src="assets/d3.png" alt="View" width="75%" />
  <img src="assets/d4.png" alt="View" width="75%" />
  <img src="assets/d5.png" alt="View" width="75%" />
  <img src="assets/d6.png" alt="View" width="75%" />
  <img src="assets/d7.png" alt="View" width="75%" />
  <img src="assets/d8.png" alt="View" width="75%" />
</div>

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** ≥ v14  
- **npm** or **yarn**  
- **MongoDB Atlas** account & cluster  
- **.env** file with your MongoDB URI and JWT secret  

### Installation
1. Clone the repo: `git clone https://github.com/yourusername/fitlife.git`  
2. Navigate to the folder: `cd fitlife`  
3. Install backend dependencies: `cd server && npm install`  
4. Install frontend dependencies: `cd ../client && npm install`  

### Environment Setup

#### Backend (.env file in server directory)
- Copy the example file: `cp server/env.example server/.env`  
- Edit with your values:  
  - `PORT=3001`  
  - `NODE_ENV=development`  
  - `MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/`  
  - `JWT_SECRET=your_super_secret_jwt_key_here`  
  - `CLIENT_URL=http://localhost:3000`  

#### Frontend (.env file in client directory)
- Copy the example file: `cp client/env.example client/.env`  
- Edit with your values:  
  - `REACT_APP_API_URL=http://localhost:3001`  

### Running the App
1. Start the backend: `cd server && npm run dev`  
2. In a new terminal, start the frontend: `cd ../client && npm start`  

---

## 🔗 API Endpoints

| Method | Endpoint                | Description |
|--------|-------------------------|-------------|
| POST   | /auth/register          | Register a new user |
| POST   | /auth/login             | Login and receive JWT cookie |
| POST   | /auth/logout            | Logout (clear cookie) |
| POST   | /auth/me                | Check authentication status |
| POST   | /api/exercises/add      | Add a new workout session |
| GET    | /api/exercises/my       | Get all sessions for the user |
| DELETE | /api/exercises/:id      | Delete specific workout session |
| GET    | /                       | Get the list of available exercises |
| GET    | /health                 | Health check endpoint |

---

## 📂 Folder Structure
```
GYM/
│── server/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js
│
│── client/
│ ├── public/
│ └── src/
│ ├── assets/
│ ├── components/
│ ├── hooks/
│ ├── pages/
│ └── ...
│
│── assets/
│ └── banner.png
│
│── README.md
```

---

## 🔐 Authentication
- **POST /auth/register** – User registration  
- **POST /auth/login** – User login  
- **POST /auth/logout** – User logout  
- **GET /auth/me** – Get current user  

---

## 🏋️ Workout Sessions
- **POST /api/exercises/add** – Create new session  
- **GET /api/exercises/my** – Get user’s sessions  
- **DELETE /api/exercises/:id** – Delete specific session  

---

## 🐦 Contact
**Author:** Samriddh Diwan & Priyanshu Jha  

---

## 💻 Technologies Used
- **Frontend**: React, Vite, Tailwind CSS, Lucide React Icons  
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Authentication**: JWT tokens with HTTP-only cookies  
- **Styling**: Tailwind CSS with custom animations  

---

❤️ Made with love for fitness enthusiasts everywhere!