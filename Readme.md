# Full-Stack To-Do List Application

**Author:** D P Rithvik Kumar

## Project Overview
This project is a fully functional To-Do List application. It features a React.js frontend that communicates with a Node.js/Express backend, utilizing MongoDB for persistent data storage. The backend architecture strictly follows the Controller-Service-Routes design pattern.

## Setup Instructions

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` directory.
2. Run `npm install` to download dependencies (Express, Mongoose, CORS, Dotenv).
3. Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   `MONGO_URI=your_mongodb_connection_string_here`
   `PORT=5000`
4. Run `node server.js` to start the backend server.

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory.
2. Run `npm install` to download dependencies (including Axios).
3. Run `npm run dev` to start the Vite development server.
4. Open the provided `localhost` link in your browser.

## Challenges Faced & Solutions
1. **CORS Errors during Integration:** When I first tried to connect the React frontend (running on port 5173) to the Express backend (running on port 5000), the browser blocked the requests due to Cross-Origin Resource Sharing security policies. I addressed this by installing the `cors` middleware in Express and applying it globally in `server.js`.
2. **Asynchronous UI Updates:** Deleting a task in the database is asynchronous, meaning there is a slight delay. To make the app feel responsive, I implemented state filtering in React. Once the `axios.delete` promise resolves successfully, I filter the deleted task out of the local React state array, ensuring the UI updates instantly without requiring a full page refresh.
3. **Database Architecture Separation:** Moving from a single `server.js` file to a modular Controller/Service/Route structure was initially tricky to track. I solved this by strictly defining responsibilities: routes only handle endpoints, controllers handle the Request/Response objects, and services strictly execute the Mongoose database commands.