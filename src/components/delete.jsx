import { useState } from "react";
import dataJson from "../data/data.json";
const currentUser = dataJson.currentUser;

export function Delete({
  comments,
  setComment,
  commentId,
  username,
  replyId,
  isReply,
}) {
  const [confirmation, setConfirmation] = useState(false);

  const updateComment = comments.filter((c) => c.id !== commentId);
  const updateReplies = comments.map((c) =>
    c.id === commentId
      ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
      : c
  );

  const handleCancel = () => {
    setConfirmation(false);
  };

  const handleConfirm = () => {
    username === currentUser.username
      ? isReply
        ? setComment(updateReplies)
        : setComment(updateComment)
      : null;
  };

  return (
    <>
      {username === currentUser.username ? (
        <>
          {confirmation ? (
            <div className="delete-wrapper">
              <div className="delete-confirmation">
                <p>
                  <b>Delete Comment</b>
                </p>
                <p>
                  Are you sure you want to delete this comment? This will remove
                  the comment and can't be undone.
                </p>
                <button className="solid-btn grey-btn" onClick={handleCancel}>
                  NO, CANCEL
                </button>
                <button className="solid-btn red-btn" onClick={handleConfirm}>
                  YES, DELETE
                </button>
              </div>
            </div>
          ) : (
            <button
              className="delete-btn mini-btn"
              onClick={() => setConfirmation(true)}
            >
              Delete
            </button>
          )}
        </>
      ) : null}
    </>
  );
}

// export function DeleteConfirmation({
//   comments,
//   setComment,
//   confirmation,
//   setConfirmation,
//   isReply,
//   setIsReply,
// }) {
//   const updateComment = comments.filter((c) => c.id !== confirmation);
//   const updateReplies = comments.map((c) =>
//     c.id === confirmation
//       ? { ...c, replies: c.replies.filter((r) => r.id !== confirmation) }
//       : c
//   );
//   console.log(isReply);
//   console.log(confirmation);
//   console.log(updateReplies);
//   const handleCancel = () => {
//     setConfirmation(null);
//     setIsReply(false);
//   };

//   const handleConfirm = () => {
//     setComment(isReply ? updateReplies : updateComment);
//     setConfirmation(null);
//     setIsReply(false);
//   };

//   return (
//     <>
//       {confirmation ? (
//         <div className="delete-confirmation">
//           <p>
//             <b>Delete Comment</b>
//           </p>
//           <p>
//             Are you sure you want to delete this comment? This will remove the
//             comment and can't be undone.
//           </p>
//           <button className="solid-btn grey-btn" onClick={handleCancel}>
//             NO, CANCEL
//           </button>
//           <button className="solid-btn red-btn" onClick={handleConfirm}>
//             YES, DELETE
//           </button>
//         </div>
//       ) : null}
//     </>
//   );
// }
