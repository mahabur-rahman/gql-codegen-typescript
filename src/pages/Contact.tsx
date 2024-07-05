import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client';
import { SEND_EMAIL } from '../graphql/mutations/mutations';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}


const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [sendEmailMutation] = useMutation(SEND_EMAIL);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendEmailMutation({
        variables: {
          sendEmailInput: {
            name: formState.name,
            email: formState.email,
            subject: formState.subject,
            message: formState.message
          }
        }
      });

      // Clear the form fields after successful submission
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <h2 className="text-5xl text-center text-blue-400">Join with us</h2>

      <div className="container p-4 mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="subject">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={formState.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="message">
              Message
            </label>
            <textarea
              name="message"
              id="message"
              value={formState.message}
              onChange={handleChange}
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              rows={5}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Contact;
