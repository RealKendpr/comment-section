import { useState } from "react";
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
  const [textArea, setTextArea] = useState("");

  const textAreaDisabled = textArea.length < 40;
  const newReply = createReply(textArea, commentUsername);
  const newComment = createComment(textArea);

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
    textArea.length >= 40
      ? isCommentForm
        ? setComment([...comments, newComment])
        : setComment(updatedReplies)
      : null;
    setTextArea("");
    setOPenForm({ commentId: null, type: null });
  };

  const isCommentForm = type === "CommentForm";

  return (
    <>
      {isCommentForm ? (
        <>
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              onFocus={() => setOPenForm({ commentId: null, type: null })}
            ></textarea>
            <button disabled={textAreaDisabled}>Send</button>
          </form>
        </>
      ) : openForm.commentId === commentId &&
        openForm.replyId === replyId &&
        openForm.type === type ? (
        <div className={isCommentForm ? "ReplyToComment" : "ReplyToReply"}>
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
              onBlur={() =>
                textArea.length === 0 &&
                setOPenForm({ commentId: null, type: null })
              }
            ></textarea>
            <button disabled={textAreaDisabled}>REPLY</button>
          </form>
        </div>
      ) : (
        <button onClick={() => setOPenForm({ commentId, replyId, type })}>
          REPLY
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
