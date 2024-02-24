// import { useState } from "react";
import { Comments } from "./components/comments";
// import UserIcon from "./components/assets/images/avatars/image-juliusomo.png";
// import CommentForm from "./components/CommentForm";

function App() {
  // const addComment = (text, parentId) => {
  //   console.log(text, parentId);
  // };

  return (
    <>
      <div className="comment-section">
        <div className="commentList">
          <Comments></Comments>
        </div>
        <div className="user-inputs">
          {/* <input type="text" />
          <div>
            <img src={UserIcon} alt="" /> <button>SEND</button>
          </div> */}
          {/* <CommentForm
            handleSubmit={addComment}
            submitLabel="SEND"
            userIcon={UserIcon}
          ></CommentForm> */}
        </div>
      </div>
    </>
  );
}

export default App;
