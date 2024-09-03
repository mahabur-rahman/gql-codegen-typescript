import { gql } from "../__generated__";

export const NOTIFICATIONS = gql(`
    subscription notificationCreated {
      notificationCreated {
        _id
        title
        user {
          _id
          firstName
          lastName
          email
        }
      }
    }
  `);


// yt video: https://youtu.be/Bf3k7zH0I6w