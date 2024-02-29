import { useState } from "react";
import dataJson from "./data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import CommentForm from "./CommentForm";
import { ConfirmDelete, DeleteBtn } from "./deleteBtn";
// import { createComment as createCommentApi } from "./api";

export function Comments() {
  const currentUser = dataJson.currentUser;
  const [comments, setComment] = useState(dataJson.comments);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteComment, setDeleteComment] = useState(null);

  const handleDelete = (commentId, commentUser) => {
    if (commentUser.username === currentUser.username) {
      setDeleteComment(commentId);
    }
    setShowConfirmation(true);
  };
  const handleCancel = () => {
    setDeleteComment(null);
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    const updatedComment = comments.filter(
      (comment) => comment.id !== deleteComment
    );

    // this.setState({
    //   comments: updatedComment,
    //   showConfirmation: false,
    //   deleteComment: null,
    // });
    setComment(updatedComment);
    setDeleteComment(null);
    setShowConfirmation(false);
  };

  return (
    <>
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <>
            <article key={id}>
              <div>
                <img src={user.image.png} alt="" />
                <a href="#">{user.username}</a>
                <div>{createdAt}</div>
              </div>
              <p>{content}</p>
              <div>
                <Scores {...comment}></Scores>
                {user.username === currentUser.username ? (
                  <div>
                    <button>Edit</button>
                    {/* <button>Delete</button> */}
                    <DeleteBtn
                      handleDelete={() => handleDelete(id, user)}
                      // handleConfirm={() => handleConfirm(user)}
                    ></DeleteBtn>
                  </div>
                ) : (
                  <button>Reply</button>
                )}
              </div>
              <div className="replies">
                {replies.length > 0 && <Replies></Replies>}
              </div>
            </article>
            <ConfirmDelete
              key={id + 57}
              showConfirmation={
                showConfirmation && comment.id === deleteComment
              }
              handleCancel={handleCancel}
              handleConfirm={handleConfirm}
            ></ConfirmDelete>
          </>
        );
      })}
      <div className="userInputs">
        <CommentForm setComment={setComment}></CommentForm>
      </div>
    </>
  );
}
