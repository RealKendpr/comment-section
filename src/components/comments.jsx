import dataJson from "./data.json";
// import UserIcon from "./assets/images/avatars/image-juliusomo.png";
import { Replies } from "./replies";
import { Scores } from "./score";
import CommentForm from "./CommentForm";
// import { createComment as createCommentApi } from "./api";
// import { useState } from "react";
import { useEffect, useState } from "react";

export function Comments() {
  // let commentList = dataJson.comments;

  const currentUser = dataJson.currentUser;
  const [commentList, addComment] = useState(dataJson.comments);
  const [textArea, setTextArea] = useState("");

  // useEffect(() => {
  //   addComment;
  // }, [dataJson.comments]);

  const obj = {
    id: commentList.length + 20,
    content: textArea,
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./src/components/assets/images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "hdjdj",
    },
    replies: [],
  };

  const submitForm = (e) => {
    e.preventDefault();
    // obj;

    // commentList = [...commentList, obj];
    addComment([...commentList, obj]);
    console.log(commentList);
    // console.log(addComment);
    // console.log(textArea);
  };
  // console.log(commentList);

  return (
    <>
      {commentList.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <article key={id}>
            <div>
              <img src={user.image.png} alt="" />
              <a href="#">{user.username}</a>
              <div>{createdAt}</div>
            </div>
            <p>{content}</p>
            <div>
              <Scores {...comment}></Scores>
              <button>Reply</button>
            </div>
            <div className="replies">
              {replies.length > 0 && <Replies></Replies>}
            </div>
          </article>
        );
      })}
      <div className="userInputs">
        {/* <CommentForm
          // {...commentList}
          // handleSubmit={addComment}z
          // submitLabel="SEND"
          // userIcon={UserIcon}
        ></CommentForm> */}

        <form onSubmit={submitForm}>
          <textarea
            value={textArea}
            onChange={(e) => setTextArea(e.target.value)}
          ></textarea>
          <button>Send</button>
        </form>
      </div>
    </>
  );
}
