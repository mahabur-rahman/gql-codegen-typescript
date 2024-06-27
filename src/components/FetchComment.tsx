import { useMutation, useQuery } from "@apollo/client";
import { GET_COMMENT_QUOTE_REF } from "../graphql/queries/queries";
import { FC, useState } from "react";
import WriteComment from "./WriteComment";
import { CREATE_COMMENT, DELETE_COMMENT, EDIT_COMMENT } from "../graphql/mutations/mutations";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { Modal, Input } from "antd";

type CommentProps = {
  quoteId: string;
};

const FetchComment: FC<CommentProps> = ({ quoteId }) => {
  const { user } = useSelector((state: RootState) => state?.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState("");
  const [currentCommentId, setCurrentCommentId] = useState("");

  const { data, loading, error, refetch } = useQuery(GET_COMMENT_QUOTE_REF, {
    variables: { quoteId },
  });

  const [deleteCommentById] = useMutation(DELETE_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  //   write comment here
  const [writeComment] = useMutation(CREATE_COMMENT);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments: {error.message}</p>;

 
  const showModal = (commentId: string, content: string) => {
    setCurrentCommentId(commentId);
    setCurrentContent(content);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      await editComment({
        variables: {
          commentId: currentCommentId,
          content: currentContent,
        },
      });
      await refetch();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // write comment
  const handleCommentSubmit = async (text: string) => {
    try {
      await writeComment({
        variables: {
          createCommentDto: {
            content: text,
            quoteRef: quoteId,
          },
        },
      });
      await refetch();
    } catch (error) {
      console.error("Error writing comment:", error);
    }
  };

  // delete comment
  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentById({
        variables: {
          commentId,
        },
      });
      await refetch();
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <div>
      {data?.getCommentsByQuote?.map((comment) => (
        <div key={comment._id} className="flex justify-between">
          <p>{comment.content}</p>
          {/* Example of mapping through commentedBy */}
          <ul>
            {comment.commentedBy.map((user) => (
              <li key={user?._id}>
                {user?.firstName} - {user?.lastName}
              </li>
            ))}
          </ul>
          {/* only comment owner can see trash comment */}
          {comment.commentedBy.some(({ _id }) => _id === user?._id) && (
            <div className="flex items-center justify-center w-8 h-8 bg-red-200 rounded-full cursor-pointer">
              <FaRegTrashCan onClick={() => handleDeleteComment(comment._id)} />
            </div>
          )}

          {/* only comment owner can see edit comment */}
          {comment.commentedBy.some(({ _id }) => _id === user?._id) && (
            <div
              className="flex items-center justify-center w-8 h-8 bg-red-200 rounded-full cursor-pointer"
              onClick={() => showModal(comment._id, comment?.content)}
            >
              <FaEdit />
            </div>
          )}

          {/* edit modal */}
          <Modal
            title="Edit comment"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Input
              value={currentContent}
              onChange={(e) => setCurrentContent(e.target.value)}
            />
          </Modal>
        </div>
      ))}

      <WriteComment onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default FetchComment;
