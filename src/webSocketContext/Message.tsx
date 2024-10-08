import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "./WebSocketContext";

type MessagePayload = {
  content: string;
  msg: string;
};

const Websocket = () => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected!");
    });

    socket.on("onMessage", (newMessage: MessagePayload) => {
      console.log("onMessage event received!");
      console.log(newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });


    // clean up 
    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  };

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg) => (
                <div>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Websocket;
