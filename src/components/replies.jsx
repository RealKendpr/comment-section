import { InputForm } from "./InputForms";
import { Scores } from "./score";
import { EditComment } from "./editComment";
import { Delete } from "./delete";
import TimeAgo from "react-timeago";

export function Replies({
  currentUser,
  replies,
  commentUsername,
  commentId,
  openForm,
  setOPenForm,
  comments,
  setComment,
}) {
  return (
    <>
      {commentUsername !== currentUser.username && (
        <InputForm
          commentUsername={commentUsername}
          comments={comments}
          setComment={setComment}
          openForm={openForm}
          setOPenForm={setOPenForm}
          commentId={commentId}
          type="ReplyToComment"
        ></InputForm>
      )}
      {replies.length !== 0 && (
        <div className="replies">
          {replies.map((eachReply) => {
            const { id, content, createdAt, replyingTo, user } = eachReply;
            return (
              <div key={id}>
                <article key={id}>
                  <div>
                    <img src={user.image.png} alt="" />
                    <a href="#">{user.username}</a>
                    <div>
                      {createdAt.includes("ago") ? (
                        <time>{createdAt}</time>
                      ) : (
                        <TimeAgo date={createdAt} live={false}></TimeAgo>
                      )}
                    </div>
                  </div>
                  <p>
                    <a href="#">{"@" + replyingTo}</a> &nbsp; {content}
                  </p>
                  <div>
                    <Scores
                      comments={comments}
                      setComment={setComment}
                      score={eachReply.score}
                      commentId={commentId}
                      replyId={id}
                      username={user.username}
                      type="Reply"
                    ></Scores>
                    {user.username === currentUser.username ? (
                      <div className="comment-operations">
                        <EditComment
                          comments={comments}
                          setComment={setComment}
                          commentId={commentId}
                          replyId={id}
                          content={content}
                          openForm={openForm}
                          setOPenForm={setOPenForm}
                          type="EditForm"
                          isReply={true}
                        ></EditComment>
                        <Delete
                          comments={comments}
                          setComment={setComment}
                          commentId={commentId}
                          replyId={id}
                          username={user.username}
                          type="Reply"
                          isReply={true}
                        ></Delete>
                      </div>
                    ) : null}
                  </div>
                </article>
                <InputForm
                  commentUsername={user.username}
                  comments={comments}
                  setComment={setComment}
                  replyId={id}
                  openForm={openForm}
                  setOPenForm={setOPenForm}
                  commentId={commentId}
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
