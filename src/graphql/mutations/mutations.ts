import { gql } from "../__generated__";

export const CREATE_QUOTE = gql(`
  mutation CreateQuote($createQuoteDto: CreateQuoteDto!) {
    createQuote(createQuoteDto: $createQuoteDto) {
      _id
      title
      images
      videos
    }
  }
`);

export const SIGN_UP = gql(`
mutation SignUpUser($signUpDto:SignUpDto!){
    signUp(signUpDto:$signUpDto){
        _id
        firstName
        lastName
        email
        password
        role
        image
    }
}
    
`);

export const DELETE_QUOTE = gql(`      
    mutation deleteQuote($id: String!){
        deleteQuote(id : $id){
            _id
            title
     }
}
    
 `);

export const UPDATE_QUOTE = gql(`
     mutation updateQuote($id:String!, $title:String!){
        updateQuote(id:$id, title:$title){
            _id
            title
        }
}
    `);

export const LIKE_QUOTE = gql(`  
 mutation likeQuote($id:String!){
    likeQuote(id:$id){
          _id
         title
         likes{
            _id
         }
     }
}
        
 `);

export const DISLIKE_QUOTE = gql(`
mutation dislikeQuote($id:String!){
  dislikeQuote(id:$id){
    _id
    title
dislikes{
  _id
}
  }
}       
 `);

export const CREATE_COMMENT = gql(`
 mutation createComment($createCommentDto: CreateCommentDto!){
    createComment(createCommentDto: $createCommentDto){
            _id
            content
        }
}`);

export const DELETE_COMMENT = gql(`
 mutation deleteComment($commentId:String!){
    deleteComment(commentId:$commentId){
        _id
    }
}`);

export const EDIT_COMMENT = gql(`
mutation editComment($commentId:String!, $content:String!){
    editComment(commentId:$commentId, content:$content){
        _id
        content
    }
 }
    
`);

// google singIn
export const GOOGLE_LOGIN_MUTATION = gql(`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      token
      user {
        _id
        firstName
        lastName
        email
        image
        role
      }
    }
  }
`);

// reply comment
export const REPLY_COMMENT = gql(`
  mutation ReplyToComment($parentCommentId: String!, $replyContent: String!) {
  replyToComment(parentCommentId: $parentCommentId, replyContent: $replyContent) {
    _id
    content
  }
}

`);

// rating
export const INCREASE_RATING = gql(`
  mutation IncreaseRating($id: String!, $rating: Float!) {
    increaseRating(id: $id, rating: $rating) {
      _id
      title
      rating
    }
  }
`);

export const SEND_EMAIL = gql(`
  mutation SendEmail($sendEmailInput: SendEmailDto!) {
    sendEmail(sendEmailInput: $sendEmailInput)
  }
`);

// forgot password
export const FORGOT_PASSWORD = gql(` 
  mutation($email:String!){
    forgotPassword(email:$email)
 }
`);

// reset password
export const RESET_PASSWORD = gql(`
  mutation( $token: String! $userId: String! $newPassword: String!){
    resetPassword(token:$token, userId:$userId, newPassword:$newPassword){
        firstName
        lastName
      }
}
  `);

// payment
export const PAYMENT = gql(`
    mutation placeOrder($input: PaymentDto!) {
      placeOrder(paymentInput: $input) {
        GatewayPageURL
          paymentOutput {
            name
            amount
            currency
            postCode
            address
            phone
            productId
          }
      }
}



  `);

export const RESET_NOTIFICATION_COUNT = gql(` 
    mutation{
  resetNotificationCount
  }
    `);
