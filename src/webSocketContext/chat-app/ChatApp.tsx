import { DocumentNode, useQuery } from "@apollo/client";
import { gql } from "graphql-tag";
import { User, Query } from "../../graphql/__generated__/graphql";
import { io, Socket } from "socket.io-client";
import { useEffect, useState, FormEvent } from "react";
import { RootState } from "../../store/index";
import { useSelector } from "react-redux";
import { FaRegTrashCan } from "react-icons/fa6";

export const GET_ALL_USERS: DocumentNode = gql`
  query {
    getAllUsers {
      _id
      firstName
      email
      image
    }
  }
`;

const socket: Socket = io("http://localhost:5000");

const ChatApp = () => {
  const currentUserId = useSelector((state: RootState) => state.auth.user?._id);
  const { loading, error, data } = useQuery<Query>(GET_ALL_USERS);
  const [messages, setMessages] = useState<
    Array<{
      _id: string;
      senderId: string;
      recipientId: string;
      content: string;
    }>
  >([]);
  const [message, setMessage] = useState<string>("");
  const [editedMessage, setEditedMessage] = useState<{
    _id: string;
    content: string;
  } | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    socket.on(
      "chatMessage",
      (newMessage: {
        _id: string;
        senderId: string;
        recipientId: string;
        content: string;
      }) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    );

    socket.on(
      "allMessages",
      (
        allMessages: Array<{
          _id: string;
          senderId: string;
          recipientId: string;
          content: string;
        }>
      ) => {
        setMessages(allMessages);
      }
    );

    socket.on("messageDeleted", (messageId: string) => {
      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== messageId)
      );
    });

    socket.on(
      "messageEdited",
      (updatedMessage: { _id: string; content: string }) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message._id === updatedMessage._id
              ? { ...message, content: updatedMessage.content }
              : message
          )
        );
      }
    );

    return () => {
      socket.off("chatMessage");
      socket.off("allMessages");
      socket.off("messageDeleted");
      socket.off("messageEdited");
    };
  }, []);

  useEffect(() => {
    if (selectedUser) {
      socket.emit("getMessages", {
        senderId: currentUserId,
        recipientId: selectedUser._id,
      });
    }
  }, [selectedUser, currentUserId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedUser) {
      alert("Select a user to chat with");
      return;
    }

    const newMessage = {
      senderId: currentUserId!,
      recipientId: selectedUser._id,
      content: message,
    };
    socket.emit("chatMessage", newMessage);
    setMessage("");
  };

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("deleteMessage", messageId);
  };

  const handleEditMessage = (messageId: string, content: string) => {
    setEditedMessage({ _id: messageId, content });
  };

  const submitEditMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedMessage) {
      socket.emit("editMessage", {
        messageId: editedMessage._id,
        newContent: editedMessage.content,
      });
      setEditedMessage(null);
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <h2 className="py-4 text-3xl font-bold border-b border-orange-400">
          Users
        </h2>
        <ul className="user-list">
          {data?.getAllUsers.map((user: User) => (
            <li
              key={user._id}
              className="flex items-center justify-between user"
              onClick={() => setSelectedUser(user)}
              style={{
                cursor: "pointer",
                fontWeight: selectedUser?._id === user._id ? "bold" : "normal",
              }}
            >
              <img
                src={
                  user.image !== null && user.image !== undefined
                    ? user.image
                    : ""
                }
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              {user.firstName}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-area">
        <div className="chat-header">
          <h2>Chat with {selectedUser?.firstName}</h2>
        </div>
        <div className="messages">
          {messages.map((msg) => {
            return (
              <div key={msg._id} className="flex justify-between m-3">
                <div>
                  {editedMessage?._id === msg._id ? (
                    <form onSubmit={submitEditMessage}>
                      <input
                        type="text"
                        value={editedMessage.content}
                        onChange={(e) =>
                          setEditedMessage({
                            ...editedMessage,
                            content: e.target.value,
                          })
                        }
                      />
                      <button type="submit">Save</button>
                    </form>
                  ) : (
                    msg.content
                  )}
                </div>
                {currentUserId === msg.senderId && (
                  <div>
                    <FaRegTrashCan
                      className="mx-2 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteMessage(msg._id)}
                    />
                    <button onClick={() => handleEditMessage(msg._id, msg.content)}>
                      Edit
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
