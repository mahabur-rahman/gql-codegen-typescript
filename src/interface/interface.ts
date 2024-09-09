interface User {
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
  
  export interface ResetNotificationCountResponse {
    resetNotificationCount: {
      success: boolean;
    };
  }