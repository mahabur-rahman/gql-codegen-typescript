import { useQuery, gql } from "@apollo/client";

const USER_PROFILE = gql`
  query {
    getUserProfile {
      _id
      firstName
      lastName
      email
      image
      role
    }
  }
`;

function Profile() {
  const { data, loading, error } = useQuery(USER_PROFILE);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const profile = data?.getUserProfile;

  return (
    <div className="p-5">
      <h1 className="my-6 text-4xl text-center text-red-500">Profile</h1>
      {profile ? (
        <>
          <img src={profile.image} alt="" />
          <p>ID: {profile._id}</p>
          <p>First Name: {profile.firstName}</p>
          <p>Last Name: {profile.lastName}</p>
          <p>Email: {profile.email}</p>
          <p>Email: {profile.role}</p>
        
        </>
      ) : (
        <p>No profile data</p>
      )}
    </div>
  );
}

export default Profile;
