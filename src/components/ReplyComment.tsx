import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Comment, Reply } from "../graphql/__generated__/graphql";

type ReplyCommentProps = {
  comment: Comment;
};

const ReplyComment: React.FC<ReplyCommentProps> = ({ comment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  console.log(comment);

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
          <div className="flex justify-between" key={reply.repliedBy.__typename}>
            <p>{reply?.replyContent}</p>
            <p className="text-red-500">{reply?.repliedBy.firstName}</p>
          </div>
        ))}
      </Modal>
    </>
  );
};

export default ReplyComment;
