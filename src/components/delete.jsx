import { useContext, useEffect, useRef, useState } from "react";
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
  const { setOPenForm } = useContext(OpenFormContext);
  const ref = useRef();

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

  useEffect(() => {
    confirmation ? ref.current?.showModal() : ref.current?.close();
    const keyPress = (e) => {
      e.key === "Escape" && setConfirmation(false);
    };
    confirmation
      ? document.addEventListener("keydown", keyPress)
      : document.removeEventListener("keydown", keyPress);
  }, [confirmation]);

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
            ref={ref}
            tabIndex={0}
            aria-label="Delete Comment"
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
                <svg
                  width="12"
                  height="14"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ED6368"
                >
                  <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" />
                </svg>
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
