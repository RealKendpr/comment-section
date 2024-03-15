import dataJson from "../data/data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import { Delete } from "./delete";
import { EditComment } from "./forms/editComment";
import TimeAgo from "react-timeago";
import { useContext } from "react";
import { InputForm } from "./forms/InputForms";
import {
  CommentIdContext,
  CommentContext,
  OpenFormContext,
} from "../context/context";
import { Button } from "./buttons";

export function Comments() {
  const currentUser = dataJson.currentUser;

  const { comments } = useContext(CommentContext);
  const { openForm, setOPenForm } = useContext(OpenFormContext);
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <div key={id}>
            <CommentIdContext.Provider value={id}>
              <div className="comment-wrapper">
                <article key={id} className="comment">
                  <div className="comment-info">
                    <div className="img-wrapper">
                      <img src={user.image.png} alt="" />
                    </div>
                    <a href="#">{user.username}</a>
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
                    // <div className="user-operations">
                    <>
                      <EditComment
                        content={content}
                        type="EditForm"
                      ></EditComment>
                      <Delete username={user.username}></Delete>
                    </>
                    // </div>
                  )}
                  {user.username !== currentUser.username &&
                  openForm.commentId !== id ? (
                    <Button
                      clickAction={() =>
                        setOPenForm({
                          commentId: id,
                          type: "ReplyToComment",
                        })
                      }
                      value="Reply"
                    ></Button>
                  ) : null}
                </div>
              </div>
              {user.username !== currentUser.username && (
                <InputForm
                  commentUsername={user.username}
                  type="ReplyToComment"
                ></InputForm>
              )}
              <Replies
                commentUsername={user.username}
                currentUser={currentUser}
                replies={replies}
              ></Replies>
            </CommentIdContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
