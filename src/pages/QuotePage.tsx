import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries/queries";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import {
  DELETE_QUOTE,
  DISLIKE_QUOTE,
  INCREASE_RATING,
  LIKE_QUOTE,
  UPDATE_QUOTE,
} from "../graphql/mutations/mutations";
import { Modal, Rate, Flex, Input, Radio, Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import React, { useState } from "react";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa6";
import FetchComment from "../components/FetchComment";
import {
  durations,
  languages,
  levels,
  prices,
  topics,
  features,
} from "../data";
import { setQuery } from "../store/advanceFilterSlice";

const QuotePage = () => {
  const [updateQuoteMutation] = useMutation(UPDATE_QUOTE);
  const [deleteQuoteMutation, { error }] = useMutation(DELETE_QUOTE);
  const [likeQuoteMutation] = useMutation(LIKE_QUOTE);
  const [disLikeQuoteMutation] = useMutation(DISLIKE_QUOTE);
  const [increaseRatingMutation] = useMutation(INCREASE_RATING);
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  // rating filter 
  const dispatch = useDispatch<AppDispatch>();
  const query = useSelector((state: RootState) => state.advanceFilter.query);

  console.log(query)




  // const dispatch = useDispatch();
  // const query = useSelector((state: RootState) => state.advanceFilter.query);

  const [likesInfo, setLikesInfo] = useState<
    Array<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }>
  >([]);

  const [disLikesInfo, setDisLikesInfo] = useState<
    Array<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }>
  >([]);

  const [updateQuoteTitle, setUpdateQuoteTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenLike, setIsModalOpenLike] = useState(false);
  const [isModalOpenDislike, setIsModalOpenDislike] = useState(false);

  const [currentQuoteId, setCurrentQuoteId] = useState("");

  const accessToken = useSelector(
    (state: RootState) => state?.auth?.accessToken
  );


  const handleAdvanceRatingChange = (e: any) => {
    dispatch(setQuery(e.target.value));
  };

  const { user } = useSelector((state: RootState) => state?.auth);

  // Initialize quotes fetching
  const { data, loading, refetch } = useQuery(GET_ALL_QUOTES, {
    variables: {
      filters: { title: "" }, // Initial fetch with no search filter
    },
  });

  if (loading) return <h2>Loading...</h2>;

  // Handle search and refetch quotes with search filter
  const handleSearch = () => {
    setHasSearched(true);
    refetch({
      filters: { title: searchValue },
    });
  };
  // Advance filtering
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // console.log(`Filter data: `, data);

  // for modal
  const showModal = (quoteId: string, createById: string) => {
    if (!accessToken) {
      alert("Access token is missing. Please login to update quotes.");
      return;
    }

    if (user?._id !== createById) {
      alert("You are not authorized to update this quote.");
      return;
    }

    setCurrentQuoteId(quoteId);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await updateQuoteMutation({
        variables: {
          id: currentQuoteId,
          title: updateQuoteTitle,
        },
      });
      console.log(`response: `, response.data?.updateQuote);
      // Refetch the getAllQuotes query to update the UI after update
      await refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // delete quote
  const handleDelete = async (quoteId: string, createdById: string) => {
    try {
      if (!accessToken) {
        alert("Access token is missing. Please login to delete quotes.");
        return;
      }

      if (user?._id !== createdById) {
        alert("You are not authorized to delete this quote.");
        return;
      }

      const response = await deleteQuoteMutation({
        variables: {
          id: quoteId,
        },
      });

      console.log("Quote deleted successfully:", response);

      // Refetch the getAllQuotes query to update the UI after deletion
      await refetch();
    } catch (error) {
      console.error("Error deleting quote:", error);
    }
  };

  // if (loading) return <h1>Loading...</h1>;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateQuoteTitle(e.target.value);
  };

  // like a quote
  const likeQuote = async (quoteId: string) => {
    try {
      await likeQuoteMutation({
        variables: { id: quoteId },
      });
      await refetch();
    } catch (error) {
      console.error("Error liking quote:", error);
    }
  };

  const disLikeQuote = async (quoteId: string) => {
    try {
      await disLikeQuoteMutation({
        variables: { id: quoteId },
      });
      await refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const showModalLike = (
    likesQuote: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }>
  ) => {
    setLikesInfo(likesQuote);

    setIsModalOpenLike(true);
  };

  const handleOkLike = () => {
    setIsModalOpenLike(false);
  };

  const handleCancelLike = () => {
    setIsModalOpenLike(false);
  };

  // dislike modal

  const showModalDisLike = (
    likesQuote: Array<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    }>
  ) => {
    setDisLikesInfo(likesQuote);

    setIsModalOpenDislike(true);
  };

  const handleOkDislike = () => {
    setIsModalOpenDislike(false);
  };

  const handleCancelDislike = () => {
    setIsModalOpenDislike(false);
  };

  // rating
  const handleRatingChange = async (quoteId: string, rating: number) => {
    try {
      await increaseRatingMutation({
        variables: { id: quoteId, rating },
      });
      await refetch();
    } catch (error) {
      console.error("Error increasing rating:", error);
    }
  };

  const quotes = data?.getAllQuotes?.map((quote) => (
    <>
      <div key={quote._id} className="my-8">
        <h6 className="mb-3 text-xl font-bold leading-5">{quote.title} </h6>

        <div
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          {quote?.createBy?.firstName} + {quote?.createBy?.lastName}
        </div>

        {/* Rating */}
        <Flex gap="middle" vertical>
          <Rate
            value={quote.rating}
            onChange={(value) => handleRatingChange(quote._id, value)}
          />
        </Flex>

        <div
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          {quote?.createBy?.email}
        </div>

        {quote?.images?.map((item) => (
          <div
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            <img src={item} alt="Quote images" />
          </div>
        ))}

        {quote?.videos?.map((item, index) => (
          <div
            key={index}
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
            <video autoPlay muted width="250">
              <source src={item} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}

        <div
          aria-label=""
          className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
        >
          {quote?.createBy?.role}
        </div>

        {user?._id === quote.createBy._id && (
          <div className="flex items-center justify-around bg-gray-50">
            <div onClick={() => showModal(quote._id, quote.createBy._id)}>
              <FaEdit />
            </div>
            <div
              className="text-red-500"
              onClick={() => handleDelete(quote._id, quote.createBy._id)}
            >
              <FaRegTrashAlt />
            </div>
          </div>
        )}

        <div className="flex items-center justify-around">
          <div className="my-4 " onClick={() => likeQuote(quote._id)}>
            <FaRegThumbsUp />
            <span>
              <span>{quote.likes.length}</span>
            </span>
          </div>
          <div className="my-4" onClick={() => disLikeQuote(quote._id)}>
            <FaRegThumbsDown />
            <span>{quote.dislikes.length}</span>
          </div>
        </div>

        <div className="flex items-center justify-around">
          <div
            onClick={() =>
              showModalLike(
                quote.likes.map(
                  ({ _id, firstName, lastName, email, role }) => ({
                    _id,
                    firstName,
                    lastName,
                    email,
                    role: role || "",
                  })
                )
              )
            }
          >
            Whose are likes
          </div>

          <div
            onClick={() =>
              showModalDisLike(
                quote.dislikes.map(
                  ({ _id, firstName, lastName, email, role }) => ({
                    _id,
                    firstName,
                    lastName,
                    email,
                    role: role || "",
                  })
                )
              )
            }
          >
            Whose are dislikes
          </div>
        </div>

        <div className="py-5 bg-red-50">
          <FetchComment quoteId={quote._id} />
        </div>
      </div>
    </>
  ));

  return (
    <>
      <div style={{ padding: "100px", backgroundColor: "#e2e8f0" }}>
        <h3
          style={{
            marginBottom: "16px",
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Advance Filter..
        </h3>

        <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>Search :</h4>
        <div className="flex">
          <Input
            placeholder="Search Quotes.."
            className="p-4"
            value={searchValue}
            onChange={handleChange}
          />

          <button className="p-3 bg-red-400" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div
      style={{
        padding: '10px',
        backgroundColor: 'white',
        borderRadius: '8px',
      }}
    >
      <h4 style={{ fontSize: '18px', fontWeight: 'bold' }}>Ratings</h4>
      <Radio.Group onChange={handleAdvanceRatingChange} value={query}>
        <Radio value={1}>
          <span>⭐⭐⭐⭐ 4.5 & up (4,320)</span>
        </Radio>
        <Radio value={2}>
          <span>⭐⭐⭐ 4.0 & up (7,839)</span>
        </Radio>
        <Radio value={3}>
          <span>⭐⭐ 3.5 & up (9,305)</span>
        </Radio>
        <Radio value={4}>
          <span>⭐ 3.0 & up (9,813)</span>
        </Radio>
      </Radio.Group>
    </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Language</h4>
          <div className="space-y-2">
            {languages.map((language) => (
              <Checkbox key={language.label}>
                {`${language.label} (${language.count})`}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Video Duration</h4>
          <div className="space-y-2">
            {durations.map((duration) => (
              <Checkbox key={duration.label}>
                {`${duration.label} (${duration.count})`}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Features</h4>
          <div className="space-y-2">
            {features.map((feature) => (
              <Checkbox key={feature.label}>
                {`${feature.label} (${feature.count})`}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Topics</h4>
          <div className="space-y-2">
            {topics.map((topic) => (
              <Checkbox key={topic.label}>
                {`${topic.label} (${topic.count})`}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Levels</h4>
          <div className="space-y-2">
            {levels.map((level) => (
              <Checkbox key={level.label}>
                {`${level.label} (${level.count})`}
              </Checkbox>
            ))}
          </div>
        </div>

        <div className="p-6 bg-white rounded-md shadow-sm">
          <h4 className="mb-4 text-lg font-bold">Price</h4>
          <div className="space-y-2">
            {prices.map((price) => (
              <Checkbox key={price.label}>
                {`${price.label} (${price.count})`}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            All Feeds ---- {data?.getAllQuotes.length} results
          </h2>
        </div>
        <div className="grid gap-8 row-gap-10 lg:grid-cols-2">
          <div className="max-w-md sm:mx-auto sm:text-center">{quotes}</div>

          {error && <h2 className="text-red-500">Error : {error.message}</h2>}

          {/* modal show */}
          <Modal
            title="Update Quote title"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <input
              type="text"
              placeholder="Enter your quote title.."
              onChange={handleTitleChange}
            />
          </Modal>

          {/* like  */}
          <Modal
            title="Whose are likes a quote"
            open={isModalOpenLike}
            onOk={handleOkLike}
            onCancel={handleCancelLike}
          >
            {likesInfo?.map((info) => (
              <div key={info._id}>
                <p>{info.firstName}</p>
              </div>
            ))}
          </Modal>

          {/* dislike */}
          <Modal
            title="Whose are dislikes a quote.."
            open={isModalOpenDislike}
            onOk={handleOkDislike}
            onCancel={handleCancelDislike}
          >
            {disLikesInfo?.map((info) => (
              <div key={info._id}>
                <p>{info.firstName}</p>
              </div>
            ))}
          </Modal>
        </div>
      </div>
    </>
  );
};

export default QuotePage;
