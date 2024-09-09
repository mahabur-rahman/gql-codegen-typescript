import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/authSlice";
import { Input } from "antd";
import { setSearchQuery } from "../store/searchSlice";
import { googleLogout } from "@react-oauth/google";
import { Badge, Avatar, Dropdown } from "antd";
import NotificationDropdown from "./Notifications";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { GET_ALL_NOTIFICATIONS } from "../graphql/queries/queries";
import { NOTIFICATIONS_CREATED } from "../graphql/subscriptions/notifications";
import { Notification } from "../interface/interface";

export const RESET_NOTIFICATION_COUNT = gql(` 
  mutation{
resetNotificationCount
}
  `);

export const Navbar = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationsCount, setNotificationsCount] = useState(0);
  const { data: queryData } = useQuery(GET_ALL_NOTIFICATIONS);

  const [resetNotificationCount] = useMutation(RESET_NOTIFICATION_COUNT, {
    onCompleted: () => {
      // Handle additional logic after resetting the count
      setNotificationsCount(0);
    },
  });

  useEffect(() => {
    if (queryData?.getAllNotifications) {
      setNotifications(queryData.getAllNotifications.notifications || []);
      setNotificationsCount(
        queryData.getAllNotifications.notificationsCount || 0
      );
    }
  }, [queryData]);

  // Handle new notifications
  const { data: subscriptionData } = useSubscription(NOTIFICATIONS_CREATED);

  console.log(subscriptionData)

  useEffect(() => {
    if (subscriptionData?.notificationCreated) {
      const newNotification = subscriptionData.notificationCreated;
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
      setNotificationsCount((prevCount) => prevCount + 1);
    }
  }, [subscriptionData]);

  const handleLogout = () => {
    googleLogout();
    dispatch(logout());
    navigate("/signin");
  };

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

  const handleBadgeClick = () => {
    resetNotificationCount();
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
          ></Link>
          <div className="mx-12">
            <Input placeholder="Enter keyword" onChange={handleSearch} />
          </div>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/quotes"
                aria-label="All Feeds"
                title="All Feeds"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                All Feeds
              </Link>
            </li>
            <li>
              <Link
                to="/create-feed"
                aria-label="Create Feed"
                title="Create Feed"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Create Feed
              </Link>
            </li>
            <li>
              <Link
                to="/payment"
                aria-label="Payment"
                title="Payment"
                className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
              >
                Payment
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black transition duration-200 rounded bg-deep-purple-accent-400 focus:shadow-outline focus:outline-none"
                aria-label="Contact"
                title="Contact"
              >
                Contact
              </Link>
            </li>

            <li>
              <Badge count={notificationsCount}>
                <span onClick={handleBadgeClick}>
                  <Dropdown
                    overlay={
                      <NotificationDropdown notifications={notifications} />
                    }
                    visible={dropdownVisible}
                    onVisibleChange={setDropdownVisible}
                    trigger={["hover"]}
                  >
                    <Avatar shape="square" size="large" />
                  </Dropdown>
                </span>
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
        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:ring"
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24" fill="none">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
