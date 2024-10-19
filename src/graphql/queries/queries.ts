import { gql } from "../__generated__";

export const GET_ALL_QUOTES = gql(`
  query GetAllQuotes($filters: QuoteFiltersInput) {
  getAllQuotes(filters: $filters) {
    _id
    title
    createBy {
      _id
      firstName
      lastName
      email
      role
    }
    likes {
      _id
      firstName
      lastName
      email
      role
    }
    dislikes {
      _id
      firstName
      lastName
      email
      role
    }
  }
}

`);

export const GET_COMMENT_QUOTE_REF = gql(`
query getCommentsByQuote($quoteId:String!){
  getCommentsByQuote(quoteId:$quoteId){
    _id
    content
    commentedBy{
    _id
      firstName
      lastName
    }
    replies{
      repliedBy{
        _id
        firstName
      }
      replyContent
    }
  }
}
  
`);

export const GET_ALL_NOTIFICATIONS = gql(`
  query GetAllNotifications {
  getAllNotifications {
    notifications {
      _id
      title
      user {
        _id
        firstName
        lastName
        email
      }
    }
    notificationsCount
  }
}

`);

export const GET_ALL_CALENDER = gql(` 

query GetAllCalendars {
  getAllCalendars {
    _id
    title
    startDate
    endDate
    allDay
    url
    backgroundColor
    borderColor
  }
}

  
  `);
