# GYM Workout Tracker

A comprehensive workout tracking application built with React, Node.js, and MongoDB.

## Features

### Core Functionality
- **User Authentication**: Secure login/signup system
- **Workout Sessions**: Create and manage workout sessions
- **Exercise Tracking**: Track sets, reps, and weights for each exercise
- **Progress Analytics**: View workout history and progress metrics
- **Session Management**: Complete CRUD operations for workout sessions

### Session Management (CRUD Operations)
- **Create**: Start new workout sessions with custom configurations
- **Read**: View all previous workout sessions with detailed information
- **Update**: Modify session details during active workouts
- **Delete**: Remove unwanted workout sessions with confirmation dialog

## Delete Feature

The delete functionality allows users to remove workout sessions from their history:

### Features
- **Confirmation Dialog**: Prevents accidental deletions
- **Loading States**: Visual feedback during deletion process
- **Success Notifications**: Confirms successful deletion
- **Real-time Updates**: Session list updates immediately
- **Error Handling**: User-friendly error messages

### User Experience
- Click the trash icon on any session card
- Confirm deletion in the popup dialog
- Session is removed from the dashboard
- Success notification appears briefly

## Getting Started

1. **Install Dependencies**
   ```bash
   # Server
   cd server && npm install
   
   # Client
   cd client && npm install
   ```

2. **Start Development Servers**
   ```bash
   # Server (Port 3001)
   cd server && npm run dev
   
   # Client (Port 5173)
   cd client && npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### Workout Sessions
- `POST /api/exercises/add` - Create new session
- `GET /api/exercises/my` - Get user's sessions
- `DELETE /api/exercises/:sessionId` - Delete specific session

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT tokens with HTTP-only cookies
- **Styling**: Tailwind CSS with custom animations
