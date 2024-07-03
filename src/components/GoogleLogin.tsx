import { useMutation } from "@apollo/client";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { GOOGLE_LOGIN_MUTATION } from "../graphql/mutations/mutations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useEffect } from "react";
import { login } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const GoogleSignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [googleLoginMutation, { data, error, loading }] = useMutation(
    GOOGLE_LOGIN_MUTATION
  );

  const handleGoogleLoginSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    console.log(credentialResponse);
    const googleToken = credentialResponse?.credential;

    if (!googleToken) {
      console.error("Google token is undefined!");
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

  useEffect(() => {
    if (data && data.googleLogin) {
      dispatch(login(data.googleLogin));
      window.location.reload();
      navigate("/");
    } else if (error) {
      console.error("Error logging in:", error);
    }
  }, [data, error, navigate, dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
