import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_QUOTES } from "../graphql/queries/queries";
import { useLocation } from "react-router-dom";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { DELETE_QUOTE, UPDATE_QUOTE } from "../graphql/mutations/mutations";
import { Modal } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import React, { useState } from "react";

const QuotePage = () => {
  const [updateQuoteMutation, { error: updateError }] =
    useMutation(UPDATE_QUOTE);
  const [deleteQuoteMutation, { error }] = useMutation(DELETE_QUOTE);
  const [updateQuoteTitle, setUpdateQuoteTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuoteId, setCurrentQuoteId] = useState("");

  const accessToken = useSelector(
    (state: RootState) => state?.auth?.accessToken
  );

  const { user } = useSelector((state: RootState) => state?.auth);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");

  const { data, loading, refetch } = useQuery(GET_ALL_QUOTES, {
    variables: { title: title || undefined },
  });

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

  if (loading) return <h1>Loading...</h1>;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateQuoteTitle(e.target.value);
  };

  const quotes = data?.getAllQuotes?.map((quote) => (
    <div key={quote._id} className="my-8">
      <h6 className="mb-3 text-xl font-bold leading-5">{quote.title} -</h6>

      <div
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.firstName} + {quote?.createBy?.lastName}
      </div>

      <div
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.email}
      </div>

      <div
        aria-label=""
        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
      >
        {quote?.createBy?.role}
      </div>

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
      </div>
    </div>
  );
};

export default QuotePage;
