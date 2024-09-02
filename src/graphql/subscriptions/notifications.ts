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
