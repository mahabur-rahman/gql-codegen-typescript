import { Navbar } from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import { routes } from "./route";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <Navbar />
      {router}
    </>
  );
}

export default App;
