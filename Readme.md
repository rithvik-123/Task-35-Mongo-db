# Task 35: MERN Stack To-Do App

This is my submission for Task 35. It is a full-stack To-Do application built using MongoDB, Express, React, and Node.js. 

## Live Links
Frontend: [Insert your Vercel/Render frontend link here]
Backend API: [Insert your Render backend link here]

## Features Added based on Feedback
- Added `isLoading` state in React to show a loading indicator during API calls.
- Reworked backend controllers and frontend App.jsx to reflect my own coding style.

## How to Run Locally

### Backend Setup
1. Open a terminal and navigate to the backend folder: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the backend folder and add:
   MONGO_URI=mongodb+srv://kumardprithvik_db_user:s4HP9qldWzPUUAyw@cluster0.uymlpur.mongodb.net/?appName=Cluster0
   PORT=5000
4. Start the server: `node server.js`
5. The backend will run on http://localhost:5000

### Frontend Setup
1. Open a new terminal and navigate to the frontend folder: `cd frontend`
2. Install dependencies: `npm install`
3. Open `App.jsx` and ensure the API url points to `http://localhost:5000/api/tasks` for local testing.
4. Start the React app: `npm run dev`
5. The frontend will open in your browser.