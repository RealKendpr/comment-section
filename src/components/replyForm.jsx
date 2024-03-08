import { useState } from "react";
import { createReply } from "./api";
import dataJson from "./data.json";

export function ReplyForm({
  commentUsername,
  reply,
  setReply,
  openForm,
  setOPenForm,
  commentId,
  replyId,
  type,
}) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  const textAreaDisabled = textArea.length < 50;
  const newReply = createReply(textArea, commentUsername);

  const submitForm = (e) => {
    e.preventDefault();
    textArea.length >= 50 ? setReply([...reply, newReply]) : null;
    setTextArea("");
    setOPenForm({ commentId: null, type: null });
  };

  const isReplyToReply = type === "ReplyToReply";

  return (
    <>
      {openForm.commentId === commentId &&
      openForm.replyId === replyId &&
      openForm.type === type ? (
        <div className={isReplyToReply ? "ReplyToReply" : "ReplyToComment"}>
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
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
