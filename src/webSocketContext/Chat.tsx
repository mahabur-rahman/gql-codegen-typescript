import { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch all messages when the component mounts
    socket.emit('getAllMessages', {}); // Send an empty object or any required data

    socket.on('chatMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('allMessages', (allMessages) => {
      setMessages(allMessages);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('allMessages');
    };
  }, []);

  const sendMessage = () => {
    const newMessage = { senderId: 'user123', content: message };
    socket.emit('chatMessage', newMessage);
    setMessage('');
  };

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
