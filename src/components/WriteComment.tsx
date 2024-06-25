import React, { useState } from "react";

type CommentProps = {
  onCommentSubmit: (commentText: string) => void;
};


const WriteComment: React.FC<CommentProps> = ({ onCommentSubmit }) => {
  

  const [commentText, setCommentText] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = () => {
    onCommentSubmit(commentText);
    setCommentText("");
  };




  return (
    <div>
 
      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={handleCommentChange}
      />
      <button className="bg-red-400" onClick={handleSubmit}>
        Comment
      </button>
    </div>
  );
};

export default WriteComment;