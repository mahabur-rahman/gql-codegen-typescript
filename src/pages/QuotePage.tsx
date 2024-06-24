import { useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries/queries";
import { useLocation } from "react-router-dom";

const QuotePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title');

  const { data, loading, error } = useQuery(GET_ALL_QUOTES, {
    variables: { title: title || undefined }, // Pass undefined if title is empty
  });

  if (loading) return <h1>Loading...</h1>;

  const quotes = data?.getAllQuotes?.map((quote) => (
    <div key={quote._id} className="my-8">
      <h6 className="mb-3 text-xl font-bold leading-5">
        {quote.title} - 
      </h6>

      <a
        href="/"
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.firstName} + {quote?.createBy?.lastName}
      </a>

      <a
        href="/"
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.email} 
      </a>

      <a
        href="/"
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.role} 
      </a>
    </div>
  ));

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
          Quote Page ---- {data?.getAllQuotes.length} results
        </h2>
      </div>
      <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
        <div className="max-w-md sm:mx-auto sm:text-center">
          {quotes}
        </div>

        {error && <h2>Failed to fetch : {error.message}</h2>}
      </div>
    </div>
  );
};

export default QuotePage;
