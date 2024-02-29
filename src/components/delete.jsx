import dataJson from "./data.json";
const currentUser = dataJson.currentUser;

export function DeleteBtn({ comment, setDeleteComment, setShowConfirmation }) {
  const handleDelete = () => {
    if (comment.user.username === currentUser.username) {
      setDeleteComment(comment.id);
    }
    setShowConfirmation(true);
  };

  return <button onClick={handleDelete}>Delete</button>;
}

export function ConfirmDelete({
  showConfirmation,
  setShowConfirmation,
  deleteComment,
  setDeleteComment,
  comments,
  setComment,
}) {
  const handleCancel = () => {
    setDeleteComment(null);
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    const updatedComment = comments.filter(
      (comment) => comment.id !== deleteComment
    );
    setComment(updatedComment);
    setDeleteComment(null);
    setShowConfirmation(false);
  };

  return (
    <>
      {showConfirmation && (
        <div>
          <p>Are You Sure YOu want to delete this comment?</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </>
  );
}
