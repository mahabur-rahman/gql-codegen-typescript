
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag'; // Import gql from graphql-tag
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

// Define your GraphQL mutation
const GOOGLE_LOGIN_MUTATION = gql`
  mutation GoogleLogin($token: String!) {
    googleLogin(token: $token) {
      token
      user {
        _id
        firstName
        lastName
        email
        role
      }
    }
  }
`;

const GoogleSignIn = () => {
  const [googleLoginMutation] = useMutation(GOOGLE_LOGIN_MUTATION);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log(credentialResponse)
    const googleToken = credentialResponse.credential;

    try {
      // Execute the GoogleLogin mutation with the retrieved token
      const { data } = await googleLoginMutation({ variables: { token: googleToken } });
      console.log('Login successful:', data);
      // Handle successful login, e.g., save token to local storage, redirect user, etc.
    } catch (error) {
      console.error('Login error:', error);
      // Handle error, e.g., show error message to user
    }
  };

  const handleGoogleLoginError = () => {
    console.log('Login Failed');
    // Handle login failure, e.g., show error message to user
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="598835220032-2fob1agbhilbrqeknolieiirmqvqv8su.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;
