import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your backend URL

interface Message {
  senderId: string;
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Fetch all messages when the component mounts
    socket.emit('getAllMessages', {}); // Send an empty object or any required data

    socket.on('chatMessage', (newMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on('allMessages', (allMessages: Message[]) => {
      setMessages(allMessages);
    });

    return () => {
      socket.off('chatMessage');
      socket.off('allMessages');
    };
  }, []);

  const sendMessage = () => {
    const newMessage = {content: message };
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
