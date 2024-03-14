import { useEffect, useState } from "react";
import dataJson from "../src/data/data.json";
import { Comments } from "./components/comments";
import { InputForm } from "./components/forms/InputForms";
import { CommentContext, OpenFormContext } from "./context/context";

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
        <CommentContext.Provider value={{ comments, setComment }}>
          <OpenFormContext.Provider value={{ openForm, setOPenForm }}>
            <Comments></Comments>
            <InputForm type="CommentForm"></InputForm>
          </OpenFormContext.Provider>
        </CommentContext.Provider>
      </main>
    </>
  );
}
