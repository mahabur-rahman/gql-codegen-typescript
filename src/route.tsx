import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import QuotePage from "./pages/QuotePage";
import Signup from "./pages/Signup";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Login /> },
  { path: "/quotes", element: <QuotePage /> },
  { path: "/profile", element: <Profile /> },
  //   { path: "/create-quote", element: <CreateQuote /> },
];
