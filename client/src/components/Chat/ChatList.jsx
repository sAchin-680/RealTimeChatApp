import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  // Fetch available chats for the logged-in User
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axios.get('/api/v1/chats');
        setChats(data);
      } catch (error) {
        console.error(`Failed to load Chats`, error);
      }
    };
    fetchChats();
  }, []);
  return (
    <div className='chat-list'>
      <h3>Chats</h3>
      <ul>
        {chats.map((chat) => (
          <li
            key={chat._id}
            onClick={() => onSelectChat(chat)}
            className='chat-item'
          >
            {chat.isGroupChat
              ? chat.chatName
              : `Private Chat with ${chat.users[1].username}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
