import ForgotPassword from "./components/ForgotPassword";
import EventCalender from "./components/EventCalender";
import PaymentFailed from "./components/PaymentFailed";
import PaymentSuccess from "./components/PaymentSuccess";
import ResetPassword from "./components/ResetPassword";
import Contact from "./pages/Contact";
import CreateFeed from "./pages/CreateFeed";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import QuotePage from "./pages/QuotePage";
import Signup from "./pages/Signup";

export const routes = [
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/signin", element: <Login /> },
  { path: "/quotes", element: <QuotePage /> },
  { path: "/profile", element: <Profile /> },
  { path: "/payment", element: <Payment /> },
  { path: "/payment/success/:transactionId", element: <PaymentSuccess /> },
  { path: "/payment/failed/:transactionId", element: <PaymentFailed /> },
  { path: "/create-feed", element: <CreateFeed /> },
  { path: "/contact", element: <Contact /> },
  { path: "/forget-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
{path: "/event-calender", element: <EventCalender /> },
];
