import { useContext, useState } from "react";
import dataJson from "../data/data.json";
import "../css/confirmDelete.css";
import {
  OpenFormContext,
  CommentIdContext,
  CommentContext,
} from "../context/context";
const currentUser = dataJson.currentUser;

export function Delete({ username, replyId, isReply }) {
  const [confirmation, setConfirmation] = useState(false);
  const { comments, setComment } = useContext(CommentContext);
  const commentId = useContext(CommentIdContext);
  const { openForm, setOPenForm } = useContext(OpenFormContext);

  const updateComment = comments.filter((c) => c.id !== commentId);
  const updateReplies = comments.map((c) =>
    c.id === commentId
      ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
      : c
  );

  const toggleConfirmation = () => {
    setConfirmation(true);
    setOPenForm({ commentId: null, replyId: null, type: null });
  };

  const handleCancel = () => {
    setConfirmation(false);
  };

  const handleConfirm = () => {
    username === currentUser.username
      ? isReply
        ? setComment(updateReplies)
        : setComment(updateComment)
      : null;
    setConfirmation(false);
  };

  return (
    <>
      {username === currentUser.username ? (
        <>
          {/* <div className="delete-wrapper " > */}
          <dialog
            className={
              confirmation === true
                ? "card delete-confirmation " + "visible-dialog"
                : "hidden-dialog"
            }
          >
            <p id="delete-title">
              <strong>Delete Comment</strong>
            </p>
            <p>
              Are you sure you want to delete this comment? This will remove the
              comment and can't be undone.
            </p>
            <div className="actions">
              <button className="solid-btn grey-btn" onClick={handleCancel}>
                NO, CANCEL
              </button>
              <button className="solid-btn red-btn" onClick={handleConfirm}>
                YES, DELETE
              </button>
            </div>
          </dialog>
          {/* </div> */}
          {confirmation ? null : (
            <div className="mini-btn-wrapper">
              <button
                className="delete-btn mini-btn"
                onClick={toggleConfirmation}
              >
                <img src="./assets/images/icons/icon-delete.svg" alt="" />
                Delete
              </button>
            </div>
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
