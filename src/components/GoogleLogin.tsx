import { useMutation } from "@apollo/client";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { GOOGLE_LOGIN_MUTATION } from "../graphql/mutations/mutations";

const GoogleSignIn = () => {
  const [googleLoginMutation] = useMutation(GOOGLE_LOGIN_MUTATION);

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);
    const googleToken = credentialResponse?.credential;

    if (!googleToken) {
      console.error("Google token is undefined");
      return;
    }

    try {
      const { data } = await googleLoginMutation({
        variables: { token: googleToken },
      });
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Login Failed");
  };

  return (
    <div>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}
      >
        <GoogleLogin
          useOneTap
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;
