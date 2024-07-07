import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Contact from "./pages/Contact";
import CreateFeed from "./pages/CreateFeed";
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
  { path: "/create-feed", element: <CreateFeed /> },
  { path: "/contact", element: <Contact /> },
  { path: "/forget-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
];
