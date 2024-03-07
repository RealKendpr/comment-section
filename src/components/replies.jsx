import { useState } from "react";
import { ReplyForm } from "./replyForm";
import { Scores } from "./score";
import { ReplyToReply } from "./replytoreply";

export function Replies({
  currentUser,
  replies,
  commentUsername,
  commentId,
  openForm,
  setOPenForm,
}) {
  const [reply, setReply] = useState(replies);

  return (
    <>
      {commentUsername !== currentUser.username && (
        <ReplyForm
          commentUsername={commentUsername}
          reply={reply}
          setReply={setReply}
          openForm={openForm}
          setOPenForm={setOPenForm}
          commentId={commentId}
        ></ReplyForm>
      )}
      {reply.length !== 0 && (
        <div className="replies">
          {reply.map((replyContents) => {
            const { id, content, createdAt, replyingTo, user } = replyContents;
            return (
              <div key={id}>
                <article key={id}>
                  <div>
                    <img src={user.image.png} alt="" />
                    <a href="#">{user.username}</a>
                    <div>{createdAt}</div>
                  </div>
                  <p>
                    <a href="#">{"@" + replyingTo}</a> &nbsp; {content}
                  </p>
                  <div>
                    <Scores {...replyContents}></Scores>
                    {user.username === currentUser && (
                      <div>
                        <button>Edit</button>
                        <button>Delete</button>
                      </div>
                    )}
                  </div>
                </article>
                <ReplyToReply
                  commentUsername={user.username}
                  reply={reply}
                  setReply={setReply}
                  replyId={id}
                  openForm={openForm}
                  setOPenForm={setOPenForm}
                  commentId={commentId}
                ></ReplyToReply>
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
