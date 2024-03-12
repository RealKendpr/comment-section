import { useEffect, useState } from "react";
import dataJson from "./components/data.json";
import { Comments } from "./components/comments";
import { InputForm } from "./components/InputForms";

function App() {
  const [comments, setComment] = useState(() => {
    const localValue = localStorage.getItem("COMMENTS");
    localValue === null && [];
    return localValue ? JSON.parse(localValue) : dataJson.comments;
  });
  // const [confirmation, setConfirmation] = useState(null);
  // const [isReply, setIsReply] = useState(false);

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
          // setConfirmation={setConfirmation}
          // setIsReply={setIsReply}
        ></Comments>
        <InputForm
          comments={comments}
          setComment={setComment}
          openForm={openForm}
          setOPenForm={setOPenForm}
          type="CommentForm"
        ></InputForm>
        {/* <DeleteConfirmation
          comments={comments}
          setComment={setComment}
          confirmation={confirmation}
          setConfirmation={setConfirmation}
          isReply={isReply}
          setIsReply={setIsReply}
        ></DeleteConfirmation> */}
      </main>
    </>
  );
}

export default App;
