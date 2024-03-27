import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as AvatarIcon } from "../../assets/avatar.svg";

const CommentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const CommentForm = styled.form`
  display: flex;
  margin-bottom: 20px;
  width: 100%;
`;

const CommentInput = styled.textarea`
  flex: 1;
  max-width: calc(100% - 60px); /* Adjusted width calculation */
  padding: 8px; /* Reduced padding */
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none; /* Prevent textarea from being resized */
  height: 50px; /* Reduced height */
`;

const SubmitButton = styled.button`
  padding: 8px 16px; /* Reduced padding */
  font-size: 14px; /* Reduced font size */
  background-color: black; /* Changed button color to black */
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333; /* Darken color on hover */
  }
`;

const CommentsList = styled.div`
  /* Styling for existing comments */
`;

const CommentItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CommentComponent = () => {
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    if (!commentInput.trim()) {
      alert("Please enter a comment.");
      return;
    }
    setComments([...comments, commentInput]);
    setCommentInput("");
  };

  return (
    <CommentContainer>
      <CommentsList>
        {comments.map((comment, index) => (
          <CommentItem key={index}>
            <AvatarIcon />
            {comment}
          </CommentItem>
        ))}
      </CommentsList>
      <CommentForm onSubmit={handleSubmitComment}>
        <CommentInput
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          placeholder="Add a comment..."
        />
        <SubmitButton type="submit">Post Comment</SubmitButton>
      </CommentForm>
    </CommentContainer>
  );
};

export default CommentComponent;
