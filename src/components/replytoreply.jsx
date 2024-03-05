import { useEffect, useState } from "react";
import { createReply } from "./api";
import dataJson from "./data.json";

export function ReplyToReply({
  commentUsername,
  reply,
  setReply,
  id,
  activeFormId,
  setActiveFormId,
}) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  const textAreaDisabled = textArea.length === 0;
  const newReply = createReply(textArea, commentUsername);

  const submitForm = (e) => {
    e.preventDefault();
    if (textArea.length !== 0) {
      setReply([...reply, newReply]);
    }
    setActiveFormId(null);
    setTextArea("");
  };

  return (
    <>
      {activeFormId !== id ? (
        <button
          onClick={() => {
            setActiveFormId(activeFormId === id ? null : id);
          }}
        >
          REPLY
        </button>
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
            <button disabled={textAreaDisabled}>Reply</button>
          </form>
        </div>
      )}
    </>
  );
}
