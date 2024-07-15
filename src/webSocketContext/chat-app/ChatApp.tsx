import { DocumentNode, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { User } from "../../graphql/__generated__/graphql";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";

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
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const { loading, error, data } = useQuery(GET_ALL_USERS);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  // const [currentUserId, setCurrentUserId] = useState(
  //   "668e54b9bb5d8192b61fe7a8"
  // ); // Your current user's ID

  useEffect(() => {
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

  useEffect(() => {
    if (selectedUser) {
      socket.emit("getMessages", {
        senderId: currentUserId,
        recipientId: selectedUser._id,
      });
    }
  }, [selectedUser]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sendMessage = (e) => {
    e.preventDefault();
    if (!selectedUser) {
      alert("Select a user to chat with");
      return;
    }

    const newMessage = {
      senderId: currentUserId,
      recipientId: selectedUser._id,
      content: message,
    };
    socket.emit("chatMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <h2 className="py-4 text-3xl font-bold border border-b-orange-400">
          Users
        </h2>
        <ul className="user-list">
          {data?.getAllUsers.map((user: User) => (
            <li
              key={user._id}
              className="user"
              onClick={() => setSelectedUser(user)}
              style={{
                cursor: "pointer",
                fontWeight: selectedUser?._id === user._id ? "bold" : "normal",
              }}
            >
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <h2>Chat with {selectedUser?.firstName}</h2>
        </div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.content}</div>
        ))}

        <form className="message-input" onSubmit={sendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
