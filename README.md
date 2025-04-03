# Job Hunt Platform

A full-stack job hunting platform built with MERN stack (MongoDB, Express.js, React.js, Node.js).

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create `.env` file in backend directory with following variables:
   ```
   PORT=8000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```