# Task 35 - MERN To-Do List (Resubmission)

This is my resubmission for Task 35. It is a full-stack To-Do list application built with the MERN stack (MongoDB, Express, React, Node.js) utilizing the Controller-Service-Routes architecture. 

Based on the mentor feedback, I have reworked the backend logic and added the missing features.

## Updates & New Features
* **Search & Filter:** Added a search bar to find tasks by title and a dropdown to filter tasks by their completion status (All, Pending, Completed).
* **Edit Functionality:** Updated the frontend and backend so users can actually edit the text of a task title, rather than just toggling the completion status.
* **Database Validation:** Updated the Mongoose `Task` schema to enforce strict validation (the title is required, trimmed, and must be between 3 and 100 characters).
* **Timestamps:** Added the Mongoose timestamps option to automatically track `createdAt` and `updatedAt` for every task.
* **Postman Evidence:** Included a folder named `Postman_Evidence` in the root directory containing screenshots of successful GET, POST, PUT, and DELETE API tests.

## How to Run Locally

### 1. Backend Setup
1. Open a terminal and navigate to your backend folder (or the root folder if they are combined).
2. Run `npm install` to download dependencies.
3. Create a `.env` file and add the following variables:
   ```text
   MONGO_URI=your_mongodb_atlas_connection_string
   PORT=5000