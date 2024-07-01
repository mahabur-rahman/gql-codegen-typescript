import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { useMutation } from "@apollo/client";
import { Comment, Reply } from "../graphql/__generated__/graphql";
import { REPLY_COMMENT } from "../graphql/mutations/mutations";
import { GET_COMMENT_QUOTE_REF } from "../graphql/queries/queries";

type ReplyCommentProps = {
  comment: Comment;
};

const ReplyComment: React.FC<ReplyCommentProps> = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const [replyToComment] = useMutation(REPLY_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENT_QUOTE_REF, variables: { commentId: comment._id } },
    ],
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReplyContent(e.target.value);
  };

  const handleOk = async () => {
    try {
      await replyToComment({
        variables: {
          parentCommentId: comment._id,
          replyContent,
        },
      });

      setReplyContent("");

      window.location.reload();
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Reply
      </Button>
      <Modal
        title={`Replies for comment: ${comment._id}`}
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {comment?.replies?.map((reply: Reply) => (
          <div
            className="flex justify-between"
            key={reply.repliedBy.__typename}
          >
            <p>{reply?.replyContent}</p>
            <p className="text-red-500">{reply?.repliedBy.firstName}</p>
          </div>
        ))}

        {/* Reply input field */}
        <Input
          placeholder="Reply comment.."
          value={replyContent}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
};

export default ReplyComment;
