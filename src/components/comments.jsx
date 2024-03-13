import dataJson from "../data/data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import { Delete } from "./delete";
import { EditComment } from "./forms/editComment";
import TimeAgo from "react-timeago";
import { useContext } from "react";
import {
  CommentIdContext,
  CommentContext,
  OpenFormContext,
} from "../context/context";

export function Comments() {
  const currentUser = dataJson.currentUser;

  const { comments } = useContext(CommentContext);
  const { openForm } = useContext(OpenFormContext);
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <div key={id} className="comment-wrapper">
            <CommentIdContext.Provider value={id}>
              <article key={id} className="comment">
                <div className="comment-info">
                  <img src={user.image.png} alt="" />
                  <a href="#">{user.username}</a> &nbsp;
                  {createdAt.includes("ago") ? (
                    <time>{createdAt}</time>
                  ) : (
                    <TimeAgo date={createdAt} live={false}></TimeAgo>
                  )}
                </div>
                {openForm.commentId === id &&
                openForm.type === "EditForm" ? null : (
                  <p>{content}</p>
                )}
              </article>
              <Scores
                score={comment.score}
                commentId={id}
                username={user.username}
              ></Scores>
              <div className="comment-operations">
                {user.username === currentUser.username && (
                  <div className="user-operations">
                    <EditComment
                      content={content}
                      type="EditForm"
                    ></EditComment>
                    <Delete username={user.username}></Delete>
                  </div>
                )}
                <Replies
                  commentUsername={user.username}
                  currentUser={currentUser}
                  replies={replies}
                ></Replies>
              </div>
            </CommentIdContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
