import { gql } from "../__generated__";

export const NOTIFICATIONS_CREATED = gql(`
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
