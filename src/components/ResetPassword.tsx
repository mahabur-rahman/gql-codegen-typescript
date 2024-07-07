import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { gql } from 'graphql-tag';

const RESET_PASSWORD = gql`
  mutation($token: String!, $userId: String!, $newPassword: String!) {
    resetPassword(token: $token, userId: $userId, newPassword: $newPassword) {
      firstName
      lastName
    }
  }
`;

function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get('token');
  const userId = searchParams.get('id');

  const [resetPassword, { loading, error, data }] = useMutation(RESET_PASSWORD);

  useEffect(() => {
    console.log('Token:', token);
    console.log('User ID:', userId);
    // Add logic to handle token and userId (e.g., send to backend for verification)
  }, [token, userId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await resetPassword({
        variables: {
          token,
          userId,
          newPassword,
        },
      });

      console.log('Reset Password Response:', data);
      // Add logic for success handling, e.g., redirect or show success message
    } catch (error) {
      console.error('Reset Password Error:', error);
      // Handle error, e.g., show error message to user
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="mb-8 text-6xl text-red-800">Reset Password</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2 text-lg">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
