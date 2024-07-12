

const ChatApp = () => {


    return (
        <div className="chat-app">
            {/* Left sidebar for user list */}
            <div className="sidebar">
                <h2>Users</h2>
                <ul className="user-list">
                    <li className="user">User 1</li>
                    <li className="user">User 2</li>
                    <li className="user">User 3</li>
                    {/* Replace with dynamic user list */}
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
                        <span className="username">User 1:</span>
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
