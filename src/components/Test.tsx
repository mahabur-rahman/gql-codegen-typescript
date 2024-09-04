import { useSubscription } from "@apollo/client";
import { NOTIFICATIONS_CREATED } from "../graphql/subscriptions/notifications";

const Test = () => {
  const { data, error, loading } = useSubscription(NOTIFICATIONS_CREATED);

  if (loading) {
    return <div>Listening...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="notification">
      <h2>New Video!</h2>
      <p>
        ID: <strong> {!loading && data?.notificationCreated._id} </strong>
      </p>
      <p>
        TITLE: <strong> {!loading && data?.notificationCreated.title} </strong>
      </p>
    </div>
  );
};

export default Test;
