import { InputForm } from "./forms/InputForms";
import { Scores } from "./score";
import { EditForms } from "./forms/editForms";
import { Delete } from "./delete";
import TimeAgo from "react-timeago";
import { useContext } from "react";
import {
  CommentIdContext,
  OpenFormContext,
  commentValueContext,
} from "../context/context";
import { Button } from "./buttons";

export function Replies({ currentUser, replies }) {
  const { openForm, setOPenForm } = useContext(OpenFormContext);
  const { commentId } = useContext(CommentIdContext);
  const { setCommentValue } = useContext(commentValueContext);
  return (
    <>
      {replies.length !== 0 && (
        <div className="reply-list-wrapper">
          <div className="reply-left-space"></div>
          <div className="reply-list">
            {replies.map((eachReply) => {
              const { id, content, createdAt, replyingTo, user } = eachReply;
              return (
                <div key={id}>
                  <div className="card comment-wrapper">
                    <div className="comment-info">
                      <div className="img-wrapper">
                        <img src={user.image.png} alt="" />
                      </div>
                      <div className="username">
                        <a href="#">{user.username}</a>
                        {user.username === currentUser.username && (
                          <span>you</span>
                        )}
                      </div>
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
                    <article key={id} className="comment">
                      {openForm.replyId === id &&
                      openForm.type === "EditForm" ? (
                        <EditForms
                          replyId={id}
                          content={content}
                          type="EditForm"
                          isReply={true}
                        ></EditForms>
                      ) : (
                        <p>
                          <a className="replyingTo" href="#">
                            {"@" + replyingTo + " "}
                          </a>
                          {content}
                        </p>
                      )}
                    </article>
                    <Scores
                      score={eachReply.score}
                      replyId={id}
                      username={user.username}
                      type="Reply"
                    ></Scores>
                    <div className="comment-operations">
                      {user.username === currentUser.username ? (
                        // <div className="user-operations">
                        <>
                          <Delete
                            replyId={id}
                            username={user.username}
                            isReply={true}
                          ></Delete>
                          {openForm.replyId === id ? null : (
                            <Button
                              clickAction={() => {
                                setCommentValue(content);
                                setOPenForm({
                                  commentId: commentId,
                                  replyId: id,
                                  type: "EditForm",
                                });
                              }}
                              value="Edit"
                            ></Button>
                          )}
                        </>
                      ) : // </div>
                      openForm.replyId === id ? null : (
                        <Button
                          clickAction={() =>
                            setOPenForm({
                              commentId: commentId,
                              replyId: id,
                              type: "ReplyToReply",
                            })
                          }
                          value="Reply"
                        ></Button>
                      )}
                    </div>
                  </div>
                  <InputForm
                    commentUsername={user.username}
                    replyId={id}
                    type="ReplyToReply"
                  ></InputForm>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// let list = {
//   task: [
//     subTask[
//       {
//         1: "Task1",
//         2: "Task 2",
//       }
//     ],
//   ],
//   task: [
//     subTask[
//       {
//         1: "Task1",
//         2: "Task 2",
//         3: "Task 3",
//       }
//     ],
//   ],
// };
