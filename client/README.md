# Real-Time Chat App (Frontend)

Welcome to the Real-Time Chat App! This application allows users to communicate in real-time through private and group chats, media sharing, and more. This README will guide you through setting up the frontend of the project.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time messaging with WebSockets
- Private and group chats
- Media sharing (images, videos)
- User authentication (JWT-based)
- Typing indicators and presence indicators
- Notifications for new messages
- Dark/Light mode toggle
- Multi-language support

## Technologies Used

- React
- Redux
- Socket.IO
- Firebase (for notifications)
- Axios (for HTTP requests)
- React Router (for routing)
- CSS/SCSS (for styling)

## Getting Started

Follow the steps below to set up the frontend for the Real-Time Chat App on your local machine.

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (comes with Node.js)
- **Git** (optional, for version control)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/real-time-chat-app.git
   ```

2. **Navigate to the frontend directory:**

   ```bash
   cd real-time-chat-app/frontend
   ```

3. **Install the required dependencies:**
   ```bash
   npm install
   ```

## Usage

1. **Configure Firebase:**

   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Obtain your Firebase configuration object and update it in `src/firebase.jsx`.

2. **Set up environment variables:**
   - Create a `.env` file in the root of the `frontend` directory.
   - Add the following variables:
     ```plaintext
     REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
     ```

## Running the Application

To start the application in development mode, run the following command:

```bash
npm start
```

This will start the development server and open the application in your default web browser at `http://localhost:3000`.

## Testing

To run tests for the frontend application, use the following command:

```bash
npm test
```

This will run all tests using Jest. For continuous testing in watch mode, run:

```bash
npm test -- --watch
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/YourFeature`.
3. Make your changes and commit them: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Thank you for using the Real-Time Chat App! For further assistance, please open an issue on GitHub or contact the maintainers.
