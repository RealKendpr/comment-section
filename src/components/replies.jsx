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
        <div className="reply-list">
          {replies.map((eachReply) => {
            const { id, content, createdAt, replyingTo, user } = eachReply;
            return (
              <div key={id}>
                <div className="card comment-wrapper">
                  <article key={id} className="comment">
                    <div className="comment-info">
                      <div className="img-wrapper">
                        <img src={user.image.png} alt="" />
                      </div>
                      <a href="#">{user.username}</a> &nbsp;
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
                    {openForm.replyId === id && openForm.type === "EditForm" ? (
                      <EditForms
                        replyId={id}
                        content={content}
                        type="EditForm"
                        isReply={true}
                      ></EditForms>
                    ) : (
                      <p>
                        <a href="#">{"@" + replyingTo}</a> &nbsp; {content}
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
                        <Delete
                          replyId={id}
                          username={user.username}
                          isReply={true}
                        ></Delete>
                      </>
                    ) : // </div>
                    null}
                    {openForm.replyId === id ? null : (
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
