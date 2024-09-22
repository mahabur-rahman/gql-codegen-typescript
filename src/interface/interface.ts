export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Notification {
  _id: string;
  title: string;
  user?: User | null;
}

// Define the type for the mutation response
export type ResetNotificationCountResponse = {
  resetNotificationCount: string;
};

