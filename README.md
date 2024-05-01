Jobify - Server Side

Welcome to Jobify, the server-side component of the Jobify project. Jobify is a platform designed to connect job seekers with potential employers.
Project Overview

Jobify's server side is responsible for handling data storage, authentication, and serving API endpoints for the Jobify application.
Setup Instructions

    Clone the repository.

    Navigate to the project directory: cd jobify-server.

    Install dependencies: npm install.

    Set up your environment variables in a .env file.

    To start the server in production, run: npm run server.

    For development, use: npm run dev.

Dependencies

    bcryptjs

    cookie-parser

    cors

    dayjs

    dotenv

    express

    express-async-errors

    express-mongo-sanitize

    express-rate-limit

    express-validator

    helmet

    http-status-codes

    jsonwebtoken

    mongodb

    mongoose

    morgan

    nodemon

Features

    User Authentication: Handles user registration, login, and authentication using JWT tokens.

    Job Listings: Manages job listings, including creating, updating, and deleting job posts.

    User Profiles: Stores user profiles and allows users to update their information.

    Search Functionality: Provides search capabilities for job listings based on keywords or categories.

Project Structure

    models: Contains Mongoose models for users and job listings.

    routes: Defines API endpoints for user authentication and job operations.

    controllers: Includes controller functions to handle requests from the routes.

    middlewares: Middleware functions for authentication and error handling.

    utils: Utility functions for various tasks.

Running the Server

To run the server locally, follow the setup instructions mentioned above. Ensure you have Node.js and MongoDB installed on your system.
