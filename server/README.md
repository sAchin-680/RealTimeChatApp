# Real-Time Chat App - Server Side

This is the server-side code for a real-time chat application built with Node.js, Express, and MongoDB. This application supports real-time messaging, user authentication, and various features to enhance user experience.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [Testing](#testing)
- [API Documentation](#api-documentation)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a cloud MongoDB instance)
- [npm](https://www.npmjs.com/get-npm) (Node Package Manager)

## Installation

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd real_time_chat/server
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and set the necessary environment variables:

   ```plaintext
   PORT=5000
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   ```

   Replace `<your_mongodb_connection_string>` with your MongoDB connection string and `<your_jwt_secret>` with a secure random string for JWT token signing.

## Configuration

Make sure to configure the following files:

- **`config/db.js`**: This file handles the MongoDB connection.
- **`routes/authRoutes.js`**: This file contains routes for user authentication.
- **`routes/messageRoute.js`**: This file contains routes for handling chat messages.

## Running the Server

To start the server, use the following command:

```bash
npm start
```

The server will run on `http://localhost:5000` by default. You can change the port by modifying the `PORT` variable in the `.env` file.

## Testing

To run tests for the API, execute the following command:

```bash
npm test
```

This command runs all tests defined in the `tests` directory using Jest.

## API Documentation

You can find the API documentation [here](link_to_your_api_documentation) (if you have Swagger or any other documentation setup).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
