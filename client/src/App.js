import React, { useEffect, useState } from 'react';
import {
  requestFirebaseNotificationPermission,
  listenForMessages,
} from './firebase';
import './App.css'; // Ensure you import your CSS

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const getPermission = async () => {
      const token = await requestFirebaseNotificationPermission();
      if (token) {
        console.log('FCM Token:', token);
        // Optionally, send the token to your server to store it
        // await axios.post('/api/save-token', { token });
      }
    };

    getPermission();
    listenForMessages();
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <button
        onClick={toggleTheme}
        className='p-2 rounded bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800'
      >
        Toggle Theme
      </button>
      <h1 className='text-2xl'>Real-Time Chat App</h1>
      {/* Your chat UI here */}
      <div
        className={`p-4 ${
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
        }`}
      >
        <p>This is a simple dark/light mode toggle example.</p>
      </div>
    </div>
  );
};

export default App;
