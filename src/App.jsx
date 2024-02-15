import { useState } from "react";
import { Comments } from "./components/comments.";
import UserIcon from "./components/assets/images/avatars/image-juliusomo.png";

function App() {
  return (
    <>
      <div className="comment-section">
        <div className="commentList">
          <Comments></Comments>
        </div>
        <div className="user-inputs">
          <input type="text" />
          <div>
            <img src={UserIcon} alt="" /> <button>SEND</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
