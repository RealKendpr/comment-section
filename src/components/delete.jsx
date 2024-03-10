import { useState } from "react";
import dataJson from "./data.json";
const currentUser = dataJson.currentUser;

export function Delete({
  comments,
  setComment,
  commentId,
  username,
  replyId,
  type,
}) {
  const [confirmation, setConfirmation] = useState(false);

  const updateComment = comments.filter((c) => c.id !== commentId);
  const updateReplies = comments.map((c) =>
    c.id === commentId
      ? { ...c, replies: c.replies.filter((r) => r.id !== replyId) }
      : c
  );

  const isReply = type === "Reply";

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
            <div className="confirm-delete">
              <p>Are You Sure YOu want to delete this comment?</p>
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleConfirm}>Confirm</button>
            </div>
          ) : (
            <button onClick={() => setConfirmation(true)}>Delete</button>
          )}
        </>
      ) : null}
    </>
  );
}
