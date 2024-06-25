import { useState } from "react";
import { Button, Modal } from "antd";

const LikeModal = ({
  showLikeModal,
  handleLikeOk,
  handleLikeCancel,
  isModalOpenLike,
}) => {
  return (
    <>
      <Button type="primary" onClick={showLikeModal}>
        All Likes
      </Button>
      <Modal
        title="Whose are Likes"
        open={isModalOpenLike}
        onOk={handleLikeOk}
        onCancel={handleLikeCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default LikeModal;
