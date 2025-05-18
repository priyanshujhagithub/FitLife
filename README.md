# 💪 FitLife — Your Ultimate Workout Companion

![FitLife Banner](assets/banner.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE) [![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]() [![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()

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
6. [API Endpoints](#api-endpoints)  
7. [Folder Structure](#folder-structure)  
8. [Contributing](#contributing)  
9. [License](#license)  
10. [Contact](#contact)  

---

## 🌟 About
FitLife is a modern, full-stack workout app that helps users  
- 🔐 Securely register & log in (JWT + HTTP-only cookies)  
- 📊 Track exercises, sets, reps, weight, and duration  
- 📅 View a history of workouts with rich charts and filters  
- 🌐 Easily integrate with any frontend (React, Vue, etc.)

---

## ✨ Features
- **User Authentication** (Register, Login, Logout, JWT protection)  
- **Workout Management** (Add, List, Update, Delete exercises)  
- **Progress Dashboard** with virtual population of user’s workout history  
- **Responsive Design** ready for mobile and desktop  
- **Error Handling** via centralized middleware  
- **Role-Based Access** (User / Admin)  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express, Mongoose (MongoDB Atlas)  
- **Auth:** JSON Web Tokens (JWT), bcryptjs  
- **Middleware:** cookie-parser, cors, express-validator  
- **Deployment:** Heroku / Vercel / Render  
- **Docs & Testing:** Postman / Swagger  

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
- **.env** file with:
