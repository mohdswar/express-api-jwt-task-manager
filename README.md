# Task Manager - Backend

## Overview
The backend of the Task Manager application is built using **Node.js** and **Express.js**. It serves as the core for handling API requests, managing tasks, users, and communicating with the database.

## Features
- **User Authentication**: Secure login and registration using JWT tokens.
- **Task Management**: Create, update, delete, and fetch tasks.
- **Database Integration**: Uses a MongoDB database to store tasks and user data.
- **API Endpoints**: Exposes RESTful API routes for the frontend.

## Technologies
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing tasks and user data.
- **JWT**: For user authentication and authorization.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.

## Installation

### Prerequisites
- Node.js >= 14.x
- MongoDB instance (either locally or cloud-based, e.g., MongoDB Atlas)

### Steps
1. Clone the repository:

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongo_urI
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```


    The backend should now be running on `http://localhost:3000`.

## Frontend
You can find the frontend of the Task Manager project here: [React JWT Task Manager](https://github.com/mohdswar/react-jwt-task-manager).


## Testing
You can test the API using tools like **Postman** or **Insomnia**. Make sure to pass the JWT token in the `Authorization` header for endpoints requiring authentication.

## Future Improvements
- Implement role-based authorization (e.g., admin users managing tasks of others).
- Add task filtering (e.g., filter by status or deadline).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
