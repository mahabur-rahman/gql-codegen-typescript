import { DocumentNode, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { User } from "../../graphql/__generated__/graphql";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

export const GET_ALL_USERS: DocumentNode = gql`
  query {
    getAllUsers {
      _id
      firstName
      email
    }
  }
`;

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    // Fetch all messages when the component mounts
    socket.emit("getAllMessages", {}); // Send an empty object or any required data

    socket.on("chatMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("allMessages", (allMessages) => {
      setMessages(allMessages);
    });

    return () => {
      socket.off("chatMessage");
      socket.off("allMessages");
    };
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sendMessage = (e) => {
    e.preventDefault()
    const newMessage = {
      senderId: "668e54b9bb5d8192b61fe7a8",
      recipientId: "6690fc2ae098678512ac4ed7",
      content: message,
    };
    socket.emit("chatMessage", newMessage);
    setMessage("");
  }; 

  return ( 
    <div className="chat-app">
      {/* Left sidebar for user list */}
      <div className="sidebar">
        <h2 className="py-4 text-3xl font-bold border border-b-orange-400">
          Users
        </h2>
        <ul className="user-list">
          {data?.getAllUsers.map((user: User) => (
            <li key={user._id} className="user">
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>

      {/* Main chat area */}
      <div className="chat-area">
        <div className="chat-header">
          <h2>Chat</h2>
        </div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}

        {/* Chat input */}
        <form className="message-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
