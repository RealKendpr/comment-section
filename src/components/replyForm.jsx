import { useState } from "react";
import dataJson from "./data.json";
import { createReply } from "./api";

export function ReplyForm({ commentUsername, reply, setReply }) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  const textAreaDisabled = textArea.length < 50;
  const [visibleForm, setVisibleForm] = useState(false);
  const newReply = createReply(textArea, commentUsername);

  const toggleForm = () => {
    setVisibleForm(true);
  };
  const submitForm = (e) => {
    e.preventDefault();

    if (textArea.length >= 50) {
      setReply([...reply, newReply]);
    }
    setTextArea("");
    setVisibleForm(false);
  };

  return (
    <>
      {visibleForm === false ? (
        <button onClick={toggleForm}>REPLY</button>
      ) : (
        <div className="reply-input">
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
