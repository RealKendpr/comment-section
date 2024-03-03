import { useState } from "react";
import dataJson from "./data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import CommentForm from "./CommentForm";
import { ConfirmDelete, DeleteBtn } from "./delete";
import { EditComment } from "./editComment";
// import { createComment as createCommentApi } from "./api";

export function Comments() {
  const currentUser = dataJson.currentUser;
  const [comments, setComment] = useState(dataJson.comments);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);

  return (
    <>
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <article key={id}>
            <div>
              <div className="comment">
                <div className="comment-info">
                  <img src={user.image.png} alt="" />
                  <a href="#">{user.username}</a>
                  <div>{createdAt}</div>
                </div>
                <p>{content}</p>
              </div>
              <Scores {...comment}></Scores>
              <div className="comment-operations">
                {user.username === currentUser.username ? (
                  <div>
                    <EditComment
                      comments={comments}
                      setComment={setComment}
                      id={id}
                      content={content}
                    ></EditComment>
                    <DeleteBtn
                      comment={comment}
                      setDeleteComment={setDeleteComment}
                      setShowConfirmation={setShowConfirmation}
                    ></DeleteBtn>
                  </div>
                ) : (
                  <button>Reply</button>
                )}
              </div>
            </div>
            <ConfirmDelete
              showConfirmation={
                showConfirmation && comment.id === deleteComment
              }
              setDeleteComment={setDeleteComment}
              deleteComment={deleteComment}
              setShowConfirmation={setShowConfirmation}
              comments={comments}
              setComment={setComment}
            ></ConfirmDelete>
            <div className="replies">
              {replies.length > 0 && (
                <Replies currentUser={currentUser} replies={replies}></Replies>
              )}
            </div>
          </article>
        );
      })}
      <div className="userInputs">
        <CommentForm setComment={setComment} comments={comments}></CommentForm>
      </div>
    </>
  );
}
