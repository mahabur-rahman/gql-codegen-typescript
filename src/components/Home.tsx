import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries/quoteQureries";
import { GetAllQuotesQuery } from "../graphql/__generated__/graphql";

const Home = () => {
  const { data, loading, error } = useQuery<GetAllQuotesQuery>(GET_ALL_QUOTES);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error : ${error.message}</h1>;

  if (!data) return <h1>Data not found!</h1>;

  const element = data?.getAllQuotes?.map((quote) => (
    <>
      <div>
        <h3>{quote._id}</h3>
        <h3>{quote.title}</h3>
        <h3>{quote.createBy?.firstName}</h3>
        <h3>{quote.createBy?.lastName}</h3>
        <h3>{quote.createBy.email}</h3>
      </div>
    </>
  ));

  return (
    <div>
      <h2>All quotes</h2>

      {element}
    </div>
  );
};

export default Home;
