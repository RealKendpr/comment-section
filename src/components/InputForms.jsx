import { useEffect, useRef, useState } from "react";
import { createReply, createComment } from "./api";
import dataJson from "./data.json";

export function InputForm({
  commentUsername,
  comments,
  setComment,
  openForm,
  setOPenForm,
  commentId,
  replyId,
  type,
}) {
  const currentUser = dataJson.currentUser;
  const [commentValue, setCommentValue] = useState("");
  const textareaDisabled = commentValue.length === 0;
  const textareaFocus = useRef(null);
  const newReply = createReply(commentValue, commentUsername);
  const newComment = createComment(commentValue);
  const isCommentForm = type === "CommentForm";

  const updatedReplies = comments.map((comment) =>
    comment.id === commentId
      ? {
          ...comment,
          replies: [...comment.replies, newReply],
        }
      : comment
  );

  const submitForm = (e) => {
    e.preventDefault();
    textareaDisabled === false
      ? isCommentForm
        ? setComment([...comments, newComment])
        : setComment(updatedReplies)
      : null;
    setCommentValue("");
    setOPenForm({ commentId: null, type: null });
  };

  useEffect(() => {
    openForm.commentId === commentId &&
    openForm.replyId === replyId &&
    openForm.type === type
      ? textareaFocus.current.focus()
      : null;
  }, [openForm]);

  return (
    <>
      {isCommentForm ? (
        <div className="user-comment-input">
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form className="comment-form" onSubmit={submitForm}>
            <textarea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              onFocus={() => setOPenForm({ commentId: null, type: null })}
            ></textarea>
            <button className="solid-btn" disabled={textareaDisabled}>
              Send
            </button>
          </form>
        </div>
      ) : (
        <div
          className={
            openForm.commentId === commentId &&
            openForm.replyId === replyId &&
            openForm.type === type
              ? "reply-form"
              : "hidden-form"
          }
          id={isCommentForm ? "ReplyToComment" : "ReplyToReply"}
        >
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              onBlur={() =>
                textareaDisabled && setOPenForm({ commentId: null, type: null })
              }
              ref={textareaFocus}
            ></textarea>
            <button className="solid-btn" disabled={textareaDisabled}>
              REPLY
            </button>
          </form>
        </div>
      )}
      {openForm.commentId === commentId &&
      openForm.replyId === replyId &&
      openForm.type === type ? null : (
        <button
          className="mini-btn"
          onClick={() => setOPenForm({ commentId, replyId, type })}
        >
          Reply
        </button>
      )}
    </>
  );
}

// const addReplyToComment = (commentId, newReply) => {
//   const updatedComments = comments.map((comment) => {
//     if (comment.id === commentId) {
//       return {
//         ...comment,
//         replies: [...comment.replies, newReply],
//       };
//     }
//     return comment;
//   });
//   setComment(updatedComments);
// };

{
  /* {comment.replies.map((reply) => (
        <div key={reply.id}>{reply.content}</div>
      ))} */
}
