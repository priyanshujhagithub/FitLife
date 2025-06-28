# 💪 FitLife — Your Ultimate Workout Companion

![FitLife Banner](assets/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

---

## 🚀 Table of Contents
1. [About](#about)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Demo Screenshots](#demo-screenshots)
5. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the App](#running-the-app)
6. [Deployment](#deployment)
7. [API Endpoints](#api-endpoints)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)
10. [License](#license)
11. [Contact](#contact)

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
- **Styling:** Custom CSS Modules, modern color palette
- **Testing & Docs:** Postman, Swagger (optional)

---

## 📸 Demo Screenshots

<div align="center">
  <img src="assets/dashboard1.png" alt="Dashboard View" width="45%" />
  <img src="assets/mobile.png" alt="Mobile View" width="30%" />
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

---

## 🚀 Deployment

### Backend Deployment (Render)

1. **Prepare your backend:**
   ```bash
   cd server
   npm install
   ```

2. **Deploy to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Create a new Web Service
   - Connect your GitHub repository
   - Set Root Directory to `server`
   - Set Build Command to `npm install`
   - Set Start Command to `npm start`

3. **Set environment variables in Render:**
   - `NODE_ENV=production`
   - `MONGODB_URL` (your MongoDB Atlas connection string)
   - `JWT_SECRET` (your secret key)
   - `CLIENT_URL` (your Vercel frontend URL) - **Optional**: if not set, allows all origins

### Frontend Deployment (Vercel)

1. **Prepare your frontend:**
   ```bash
   cd client
   npm install
   ```

2. **Deploy to Vercel:**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Set Root Directory to `client`
   - Set Framework Preset to `Create React App`

3. **Set environment variables in Vercel:**
   - `REACT_APP_API_URL` (your Render backend URL)

### Complete Deployment Guide

For detailed step-by-step instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

---

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

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

- **Author:** Your Name
- **Email:** your.email@example.com
- **Project Link:** [https://github.com/yourusername/fitlife](https://github.com/yourusername/fitlife)

---

> Made with ❤️ for fitness enthusiasts everywhere!
