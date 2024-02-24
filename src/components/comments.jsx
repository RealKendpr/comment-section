import dataJson from "./data.json";
import UserIcon from "./assets/images/avatars/image-juliusomo.png";
import { Replies } from "./replies";
import { Scores } from "./score";
import CommentForm from "./CommentForm";
import { createComment as createCommentApi } from "./api";
import { useState } from "react";
// import { useEffect, useState } from "react";

export function Comments() {
  const [backendComments, setBackendComment] = useState([]);

  let eachComments = dataJson.comments;
  const addComment = (text, parentId) => {
    console.log(text, parentId);
    createCommentApi(text, parentId).then((comment) => {
      setBackendComment([comment, ...backendComments]);
    });
  };

  return (
    <>
      {eachComments.map((comment) => {
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
        <CommentForm
          handleSubmit={addComment}
          submitLabel="SEND"
          userIcon={UserIcon}
        ></CommentForm>
      </div>
    </>
  );
}
