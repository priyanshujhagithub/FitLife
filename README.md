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
6. [API Endpoints](#api-endpoints)
7. [Folder Structure](#folder-structure)
8. [Contributing](#contributing)
9. [License](#license)
10. [Contact](#contact)

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
$ cd "Gym Backend"
$ npm install

# Install frontend dependencies
$ cd "../Gym Frontend"
$ npm install
```

### Running the App
```bash
# Start the backend
$ cd "Gym Backend"
$ npm start

# In a new terminal, start the frontend
$ cd "../Gym Frontend"
$ npm start
```

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

---

## 📁 Folder Structure
```
GYM/
├── Gym Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── ...
├── Gym Frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── ...
└── README.md
```

---

## 🤝 Contributing
We welcome contributions! To get started:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 📬 Contact

- **Project Maintainers:**
  - [Samriddh Diwan](mailto:samriddh.diwan.ug22@nsut.ac.in) ([GitHub](https://github.com/SamriddhDiwan))
  - [Priyanshu Jha](mailto:priyanshu.jha.ug22@nsut.ac.in) ([GitHub](https://github.com/priyanshujhagithub))

---

> Made with ❤️ for fitness enthusiasts everywhere!
