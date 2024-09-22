import { Navbar } from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import { routes } from "./route";

// import { socket, WebsocketProvider } from "./webSocketContext/WebSocketContext";
// import Message from "./webSocketContext/Message";
// import Chat from "./webSocketContext/Chat";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Navbar />
      {router}
      {/* 
      <WebsocketProvider value={socket}>
        <Message />
      </WebsocketProvider> */}

      {/* <Chat /> */}
    </>
  );
}

export default App;
