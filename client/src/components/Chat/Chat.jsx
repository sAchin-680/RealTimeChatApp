import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import FileUpload from './FileUpload'; // Import the FileUpload component

const ENDPOINT = 'http://localhost:5000'; // Update with your backend endpoint
let socket;

const Chat = ({ selectedChat, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    socket = io(ENDPOINT);

    if (selectedChat) {
      // Join chat room
      socket.emit('joinChat', { chatId: selectedChat._id, userId });

      // Listen for incoming messages
      socket.on('message', (message) => {
        setMessages((prevMessages) => [...prevMessages, message]); // Use functional update
      });

      // Listen for typing events
      socket.on('typing', ({ userId }) => {
        if (!typingUsers.includes(userId)) {
          setTypingUsers((prevTypingUsers) => [...prevTypingUsers, userId]); // Use functional update
        }
      });

      socket.on('stopTyping', ({ userId }) => {
        setTypingUsers((prevTypingUsers) =>
          prevTypingUsers.filter((user) => user !== userId)
        ); // Use functional update
      });

      // Listen for user presence
      socket.on('userConnected', ({ userId }) => {
        if (!onlineUsers.includes(userId)) {
          setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, userId]); // Use functional update
        }
      });

      socket.on('userDisconnected', ({ userId }) => {
        setOnlineUsers((prevOnlineUsers) =>
          prevOnlineUsers.filter((user) => user !== userId)
        ); // Use functional update
      });
    }

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, [selectedChat, typingUsers, onlineUsers, userId]); // Include necessary dependencies

  // Handle message input change and typing events
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);

    if (!isTyping) {
      setIsTyping(true);
      socket.emit('typing', { chatId: selectedChat._id, userId });
    }

    // Debounce stopTyping event
    const lastTypingTime = new Date().getTime();
    const typingTimeout = 3000; // 3 seconds

    setTimeout(() => {
      const currentTime = new Date().getTime();
      if (currentTime - lastTypingTime >= typingTimeout && isTyping) {
        socket.emit('stopTyping', { chatId: selectedChat._id, userId });
        setIsTyping(false);
      }
    }, typingTimeout);
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const { data } = await axios.post(
        `/api/v1/chats/${selectedChat._id}/messages`,
        { text: newMessage }
      );
      socket.emit('message', data);
      setMessages((prevMessages) => [...prevMessages, data]); // Use functional update
      setNewMessage('');
      setIsTyping(false);
      socket.emit('stopTyping', { chatId: selectedChat._id, userId });
    }
  };

  return (
    <div className='chat-box'>
      <h3>{selectedChat.chatName || 'Chat'}</h3>

      <div className='messages'>
        {messages.map((msg) => (
          <div key={msg._id} className='message'>
            <strong>{msg.userId.username}:</strong> {msg.text}
          </div>
        ))}

        {/* Typing Indicator */}
        {typingUsers.length > 0 && (
          <div className='typing-indicator'>
            {typingUsers.map((user) => (
              <span key={user}>{user} is typing...</span>
            ))}
          </div>
        )}
      </div>

      <input
        type='text'
        placeholder='Type a message...'
        value={newMessage}
        onChange={handleMessageChange}
      />
      <button onClick={handleSendMessage}>Send</button>

      {/* Add the file upload input */}
      <FileUpload />
    </div>
  );
};

export default Chat;
