import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/authSlice";
import { Input } from "antd";
import { setSearchQuery } from "../store/searchSlice";
import { googleLogout } from "@react-oauth/google";
import { useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_NOTIFICATIONS } from "../graphql/queries/queries";
import { Badge, Avatar, Dropdown } from "antd";
import NotificationDropdown from "./Notifications";
import { NOTIFICATIONS_CREATED } from "../graphql/subscriptions/notifications";

type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type Notification = {
  _id: string;
  title: string;
  user?: User | null;
};

export const Navbar = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { data } = useQuery(GET_ALL_NOTIFICATIONS);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState<number | null>(
    null
  ); // Start with null
  const [hasRealTimeNotifications, setHasRealTimeNotifications] =
    useState(false); // Track if a real-time notification is received

  const { data: notificationData, error } = useSubscription(
    NOTIFICATIONS_CREATED
  );

  // Initially load notifications
  useEffect(() => {
    if (data && data.getAllNotifications) {
      setNotifications(data.getAllNotifications as Notification[]);
    }
  }, [data]);

  // Handle real-time notification updates
  useEffect(() => {
    if (notificationData && notificationData.notificationCreated) {
      setNotifications((prevNotifications) => [
        notificationData.notificationCreated as Notification,
        ...prevNotifications,
      ]);
      setHasRealTimeNotifications(true); // Real-time notification received
      setNotificationCount((prevCount) =>
        prevCount !== null ? prevCount + 1 : 1
      ); // Increment count on new notification
    }
  }, [notificationData]);

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  // Logout function
  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    navigate("/signin");
  };

  // Handle search input
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();

    if (query !== "") {
      dispatch(setSearchQuery(query));
      navigate(`/quotes${query ? `?title=${encodeURIComponent(query)}` : ""}`);
    } else {
      dispatch(setSearchQuery(""));
      navigate(`/quotes`);
    }
  };

  return (
    <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
      <div className="relative flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            aria-label="Company"
            title="Company"
            className="inline-flex items-center mr-8"
          >
            <svg
              className="w-8 text-deep-purple-accent-400"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Company
            </span>

            <div className="mx-12">
              <Input placeholder="Enter keyword" onChange={handleSearch} />
            </div>
          </Link>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/quotes"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                All Feeds
              </Link>
            </li>
            <li>
              <Link
                to="/create-feed"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Create Feed
              </Link>
            </li>

            <li>
              <Link
                to="/payment"
                aria-label="Our product"
                title="Our product"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Payment
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                aria-label="Sign up"
                title="Sign up"
              >
                Contact
              </Link>
            </li>

            <li>
              <Badge count={hasRealTimeNotifications ? notificationCount : undefined}>
                <Dropdown
                  overlay={<NotificationDropdown notifications={notifications} />}
                  visible={dropdownVisible}
                  onVisibleChange={setDropdownVisible}
                  trigger={["hover"]}
                >
                  <Avatar shape="square" size="large" />
                </Dropdown>
              </Badge>
            </li>
          </ul>
        </div>
        <ul className="flex items-center hidden space-x-8 lg:flex">
          {accessToken ? (
            <>
              <li className="flex items-center">
                <Link
                  to="/profile"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Profile"
                  title="Profile"
                >
                  Profile{" "}
                  <span className="mx-5 text-red-600">{user?.firstName}</span>
                </Link>
                {user?._id && (
                  <img
                    src={user?.image || ""}
                    alt=""
                    className="object-cover w-12 h-12 rounded-full"
                  />
                )}
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Logout"
                  title="Logout"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/signin"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Sign in"
                  title="Sign in"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 bg-red-100 rounded shadow-md bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                  aria-label="Sign up"
                  title="Sign up"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
