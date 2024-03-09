import { useState } from "react";
import { InputForm } from "./InputForms";
import { Scores } from "./score";
import { EditComment } from "./editComment";
import { DeleteBtn, ConfirmDelete } from "./delete";

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
  const [reply, setReply] = useState(replies);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);

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
          {replies.map((replyContents) => {
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
                    {user.username === currentUser.username ? (
                      <div className="comment-operations">
                        <EditComment
                          comments={reply}
                          setComment={setReply}
                          id={id}
                          content={content}
                          openForm={openForm}
                          setOPenForm={setOPenForm}
                          type="EditForm"
                        ></EditComment>
                        <DeleteBtn
                          comment={replyContents}
                          setDeleteComment={setDeleteComment}
                          setShowConfirmation={setShowConfirmation}
                        ></DeleteBtn>
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
                <ConfirmDelete
                  showConfirmation={
                    showConfirmation && replyContents.id === deleteComment
                  }
                  setDeleteComment={setDeleteComment}
                  deleteComment={deleteComment}
                  setShowConfirmation={setShowConfirmation}
                  comments={reply}
                  setComment={setReply}
                ></ConfirmDelete>
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
