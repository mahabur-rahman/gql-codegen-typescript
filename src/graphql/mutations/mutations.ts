import { gql } from "../__generated__";

export const SIGN_UP = gql(`
mutation SignUpUser($signUpDto:SignUpDto!){
    signUp(signUpDto:$signUpDto){
        _id
        firstName
        lastName
        email
        password
        role
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
