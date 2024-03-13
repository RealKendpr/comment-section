import { InputForm } from "./forms/InputForms";
import { Scores } from "./score";
import { EditComment } from "./forms/editComment";
import { Delete } from "./delete";
import TimeAgo from "react-timeago";
import { useContext } from "react";
import { OpenFormContext } from "../context/context";

export function Replies({ currentUser, replies, commentUsername }) {
  const { openForm } = useContext(OpenFormContext);
  return (
    <>
      {commentUsername !== currentUser.username && (
        <InputForm
          commentUsername={commentUsername}
          type="ReplyToComment"
        ></InputForm>
      )}
      {replies.length !== 0 && (
        <div className="replies">
          {replies.map((eachReply) => {
            const { id, content, createdAt, replyingTo, user } = eachReply;
            return (
              <div key={id} className="comment-wrapper">
                <article key={id} className="reply">
                  <div className="comment-info">
                    <img src={user.image.png} alt="" />
                    <a href="#">{user.username}</a> &nbsp;
                    {createdAt.includes("ago") ? (
                      <time>{createdAt}</time>
                    ) : (
                      <TimeAgo date={createdAt} live={false}></TimeAgo>
                    )}
                  </div>
                  {openForm.replyId === id &&
                  openForm.type === "EditForm" ? null : (
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
                    <div className="user-operations">
                      <EditComment
                        replyId={id}
                        content={content}
                        type="EditForm"
                        isReply={true}
                      ></EditComment>
                      <Delete
                        replyId={id}
                        username={user.username}
                        isReply={true}
                      ></Delete>
                    </div>
                  ) : null}
                  <InputForm
                    commentUsername={user.username}
                    replyId={id}
                    type="ReplyToReply"
                  ></InputForm>
                </div>
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
