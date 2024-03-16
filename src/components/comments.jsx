import dataJson from "../data/data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import { Delete } from "./delete";
import { EditForms } from "./forms/editForms";
import TimeAgo from "react-timeago";
import { useState, useContext } from "react";
import { InputForm } from "./forms/InputForms";
import {
  commentValueContext,
  CommentIdContext,
  CommentContext,
  OpenFormContext,
} from "../context/context";
import { Button } from "./buttons";

export function Comments() {
  const currentUser = dataJson.currentUser;
  const [commentValue, setCommentValue] = useState("");

  const { comments } = useContext(CommentContext);
  const { openForm, setOPenForm } = useContext(OpenFormContext);
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <div key={id}>
            <CommentIdContext.Provider value={id}>
              <commentValueContext.Provider
                value={{ commentValue, setCommentValue }}
              >
                <div className="card comment-wrapper">
                  <article key={id} className="comment">
                    <div className="comment-info">
                      <div className="img-wrapper">
                        <img src={user.image.png} alt="" />
                      </div>
                      <a href="#">{user.username}</a>
                      {createdAt.includes("ago") ? (
                        <time>{createdAt}</time>
                      ) : (
                        <TimeAgo
                          date={createdAt}
                          live={false}
                          suffix="ago"
                        ></TimeAgo>
                      )}
                    </div>
                    {openForm.commentId === id &&
                    openForm.type === "EditForm" ? (
                      <EditForms content={content} type="EditForm"></EditForms>
                    ) : (
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
                        {openForm.commentId === id ? null : (
                          <Button
                            clickAction={() => {
                              setCommentValue(content);
                              setOPenForm({
                                commentId: id,
                                type: "EditForm",
                              });
                            }}
                            value="Edit"
                          ></Button>
                        )}
                        <Delete username={user.username}></Delete>
                      </>
                      // </div>
                    )}
                    {user.username ===
                    currentUser.username ? null : openForm.commentId ===
                      id ? null : (
                      <Button
                        clickAction={() =>
                          setOPenForm({
                            commentId: id,
                            type: "ReplyToComment",
                          })
                        }
                        value="Reply"
                      ></Button>
                    )}
                  </div>
                </div>
                {user.username !== currentUser.username && (
                  <InputForm
                    commentUsername={user.username}
                    type="ReplyToComment"
                  ></InputForm>
                )}
                <Replies currentUser={currentUser} replies={replies}></Replies>
              </commentValueContext.Provider>
            </CommentIdContext.Provider>
          </div>
        );
      })}
    </div>
  );
}
