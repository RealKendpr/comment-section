import { useState } from "react";
import dataJson from "./data.json";
import { createComment } from "./api";
// import { Date } from "./functions";

export default function CommentForm({ setComment, comments }) {
  const currentUser = dataJson.currentUser;
  const [textArea, setTextArea] = useState("");
  // const [currentDate, setCurrentDate] = useState(Date());

  const textAreaDisabled = textArea.length === 0;
  const newComment = createComment(textArea);

  const submitForm = (e) => {
    e.preventDefault();

    if (textArea.length !== 0) {
      setComment([...comments, newComment]);
    }
    setTextArea("");
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
