import { gql, useSubscription } from "@apollo/client";

const NOTIFICATION_CREATED = gql`
  subscription notificationCreated {
    notificationCreated {
      _id
      title
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

const Test = () => {
  const { data, error, loading } = useSubscription(NOTIFICATION_CREATED);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="notification">
      <h2>New Video!</h2>
      <p>
        ID: <strong> {!loading && data.notificationCreated._id} </strong>
      </p>
      <p>
        TITLE: <strong> {!loading && data.notificationCreated.title} </strong>
      </p>
    </div>
  );
};

export default Test;
