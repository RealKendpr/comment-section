import { useState } from "react";
import dataJson from "./data.json";
// import { createComment as createCommentApi } from "./api";

function CommentForm({ comments, setComment }) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");

  const comment = {
    id: Math.random().toString(36).substring(2, 9),
    content: textArea,
    createdAt: new Date().toISOString(),
    score: 0,
    user: currentUser,
    replies: [],
  };

  const textAreaDisabled = textArea.length === 0;

  const submitForm = (e) => {
    e.preventDefault();
    if (textArea.length !== 0) {
      setComment([...comments, comment]);
      setTextArea("");
    }
  };

  return (
    <>
      <div>
        <img src={currentUser.image.png} alt="" />
      </div>
      <form onSubmit={submitForm}>
        <textarea
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <button disabled={textAreaDisabled}>Send</button>
      </form>
    </>
  );
}

export default CommentForm;

// const obj = [
//   {
//     id: 1,
//     content:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, inventore!",
//     createdAt: "2 weeks ago",
//   },
//   {
//     id: 2,
//     content:
//       "Sit amet consectetur adipisicing elit. Reprehenderit, lorem ipsum dolor inventore!",
//     createdAt: "3 weeks ago",
//   },
// ];