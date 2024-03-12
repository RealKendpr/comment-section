import { useEffect, useState } from "react";
import dataJson from "../src/data/data.json";
import { Comments } from "./components/comments";
import { InputForm } from "./components/forms/InputForms";

export default function App() {
  const [comments, setComment] = useState(() => {
    const localValue = localStorage.getItem("COMMENTS");
    localValue === null && [];
    return localValue ? JSON.parse(localValue) : dataJson.comments;
  });

  useEffect(() => {
    localStorage.setItem("COMMENTS", JSON.stringify(comments));
  }, [comments]);

  const [openForm, setOPenForm] = useState({
    commentId: null,
    replyId: null,
    type: null,
  });

  return (
    <>
      <main className="comment-section">
        <Comments
          comments={comments}
          setComment={setComment}
          openForm={openForm}
          setOPenForm={setOPenForm}
        ></Comments>
        <InputForm
          comments={comments}
          setComment={setComment}
          openForm={openForm}
          setOPenForm={setOPenForm}
          type="CommentForm"
        ></InputForm>
      </main>
    </>
  );
}
