import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";

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
  max-width: calc(100% - 60px);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  height: 50px;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;

const CommentsList = styled.div``;

const CommentItem = styled.div`
  font-size: 14px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: ${(props) =>
    props.isCurrentUser ? "flex-end" : "flex-start"};
`;

const AvatarWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    span {
      visibility: visible;
    }
  }
`;

const AvatarInitials = styled.span`
  color: #fff;
`;

const CommentText = styled.span`
  position: relative;
`;

const CommentComponent = ({ vin }) => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const user = useSelector((state) => state.loginStatus.userInfo);

  const getInitials = (name) => {
    const splitName = name.split(" ");
    return splitName.map((part) => part.charAt(0).toUpperCase()).join("");
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/listing/${vin}/comments`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      console.log("Comments response:", response.data);
      setComments(response.data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [vin]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        `/listing/${vin}/comments`,
        { text: commentInput },
        {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        }
      );
      console.log("Comment posted successfully");
      fetchComments();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    setCommentInput("");
  };

  return (
    <CommentContainer>
      <CommentsList>
        {comments.map((comment, index) => (
          <CommentItem
            key={index}
            isCurrentUser={comment.user._id === user._id}
          >
            <AvatarWrapper
              title={`${comment.user.firstName} ${comment.user.lastName}`}
            >
              <AvatarInitials>
                {getInitials(
                  comment.user.firstName + " " + comment.user.lastName
                )}
              </AvatarInitials>
            </AvatarWrapper>
            <CommentText>{comment.text}</CommentText>
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
