import { useState } from "react";
import { createReply } from "./api";
import dataJson from "./data.json";

export function ReplyToReply({
  commentUsername,
  reply,
  setReply,
  replyId,
  // activeFormId,
  // setActiveFormId,
  openTextAreaId,
  handleOpenTextArea,
  setOpenTextAreaId,
  // closeAllTextarea,
}) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  // const [isTextAreaOpen, setIsTextAreaOpen] = useState(false);
  const isTextAreaOpen = openTextAreaId === replyId;

  const handleOpenForm = () => {
    if (openTextAreaId === replyId) {
      setOpenTextAreaId(null);
    } else {
      setOpenTextAreaId(replyId);
    }
    // setIsTextAreaOpen(true);
    // closeAllTextarea();
  };

  const textAreaDisabled = textArea.length === 0;
  const newReply = createReply(textArea, commentUsername);

  const submitForm = (e) => {
    e.preventDefault();
    textArea.length !== 0 ? setReply([...reply, newReply]) : null;
    // setActiveFormId(null);
    setTextArea("");
  };

  return (
    <>
      {/* {activeFormId === id ? ( */}
      {isTextAreaOpen && (
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
      {/* // ) : ( */}
      <button
        // onClick={() => {
        //   // setActiveFormId(activeFormId === id ? null : id);
        //   handleOpenTextArea(replyId);
        // }}
        onClick={handleOpenForm}
      >
        REPLY
      </button>
      {/* // )} */}
    </>
  );
}
