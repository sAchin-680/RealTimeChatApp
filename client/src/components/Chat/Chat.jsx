import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    socket.on('Message Recieved', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('Message Recieved');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('Message Sent', message);
    setMessages((prev) => [...prev, message]);
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit'>Send</button>
      </form>
    </div>
  );
};

export default Chat;
