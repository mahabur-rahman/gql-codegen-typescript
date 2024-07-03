import React from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { login as loginAction } from "../store/authSlice";
import GoogleSignIn from "../components/GoogleLogin";

const LOGIN_USER = gql(`
  query($email: String! $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
        password
        image
        role
      }
    }
  }
`);

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [login, { data, loading, error }] = useLazyQuery(LOGIN_USER);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });
  };

  useEffect(() => {
    if (data && data.login) {
    
      dispatch(loginAction(data.login));
      window.location.reload()

      navigate("/");
    } else if (error) {
      console.error("Error logging in:", error);
    }
  }, [data, error, navigate, dispatch]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Email:</h2>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <h2>Password:</h2>
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />

        <button type="submit" className="p-3 bg-red-300">Login</button>
        <br />
        <br />
        <br />
        <br />
        <br />
      </form>

      {/* login with google */}
      <GoogleSignIn />

      {error && <p className="error">Error logging in: {error.message}</p>}
    </div>
  );
};

export default Login;
