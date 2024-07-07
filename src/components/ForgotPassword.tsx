import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Define the GraphQL mutation
const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { loading, error, data }] = useMutation(FORGOT_PASSWORD);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    forgotPassword({ variables: { email } });
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="p-2 bg-red-200">Submit</button>
      </form>
      {error && <p>Error: {error.message}</p>}
      {data && <p>{data.forgotPassword}</p>}
    </div>
  );
};

export default ForgotPasswordForm;
