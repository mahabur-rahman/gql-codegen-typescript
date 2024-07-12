
import { DocumentNode, useQuery } from '@apollo/client';
import { gql } from 'graphql-tag';
import { User } from '../../graphql/__generated__/graphql';

export const GET_ALL_USERS: DocumentNode = gql`
  query {
    getAllUsers {
      _id
      firstName
      email
    }
  }
`;

const ChatApp = () => {
  const { loading, error, data } = useQuery(GET_ALL_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="chat-app">
      {/* Left sidebar for user list */}
      <div className="sidebar">
        <h2 className='py-4 text-3xl font-bold border border-b-orange-400'>Users</h2>
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
        <div className="flex justify-between">
          {/* Example message */}
          <div className="message">
            <span className="username">User 1:</span>
            <span className="text">Hello!</span>
          </div>

          {/* Replace with dynamic chat messages */}
          <div className="mt-16 message">
            <span className="username">User 2:</span>
            <span className="text">Hello!</span>
          </div>
        </div>

        {/* Chat input */}
        <form className="message-input">
          <input type="text" placeholder="Type your message..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatApp;
