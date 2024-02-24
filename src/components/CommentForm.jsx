//on click of reply button
//   --highlight the user's input
// when user submits the form append the contents to selected Comment
//   --get a hold of that Comment
//   --append the userinput inside its replies div

import { useState } from "react";

function CommentForm({ handleSubmit, submitLabel, userIcon }) {
  const [text, setText] = useState("");

  const textAreaDisabled = text.length === 0;

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <textarea
          className="comment-form-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div>
          <img src={userIcon} alt="" />
          <button className="comment-form-button" disabled={textAreaDisabled}>
            {submitLabel}
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
