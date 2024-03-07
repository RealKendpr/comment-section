import { useState } from "react";
import { createReply } from "./api";
import dataJson from "./data.json";

export function ReplyToReply({
  commentUsername,
  reply,
  setReply,
  replyId,
  openForm,
  setOPenForm,
  commentId,
}) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  const handleOpenForm = () => {
    if (openTextAreaId === replyId) {
      setOpenTextAreaId(null);
    } else {
      setOpenTextAreaId(replyId);
    }
  };

  const textAreaDisabled = textArea.length === 0;
  const newReply = createReply(textArea, commentUsername);

  const submitForm = (e) => {
    e.preventDefault();
    textArea.length !== 0 ? setReply([...reply, newReply]) : null;
    setTextArea("");
    setOPenForm({ commentId: null, replyId: null, type: null });
  };

  return (
    <>
      {openForm.commentId === commentId &&
      openForm.replyId === replyId &&
      openForm.type === "ReplyToReply" ? (
        <div className="reply-input">
          <div>
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={textArea}
              onChange={(e) => setTextArea(e.target.value)}
            ></textarea>
            <button disabled={textAreaDisabled}>Reply</button>
          </form>
        </div>
      ) : (
        <button
          onClick={() =>
            setOPenForm({ commentId, replyId, type: "ReplyToReply" })
          }
        >
          REPLY
        </button>
      )}
    </>
  );
}
