import React from "react";
import { Avatar } from "antd";

const NotificationDropdown = ({ notifications }) => {
  return (
    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg w-72">
      <ul className="p-2">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <li
              key={notification._id}
              className="flex items-start p-2 cursor-pointer hover:bg-gray-100"
            >
              <Avatar className="mr-3" shape="square" size="small" />
              <div>
                <div className="font-semibold text-gray-800">
                  {notification.title}
                </div>
                <div className="text-sm text-gray-500">
                  {notification?.user?.firstName} {notification?.user?.lastName}
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="p-2 text-gray-500">No notifications</li>
        )}
      </ul>
    </div>
  );
};

export default NotificationDropdown;
