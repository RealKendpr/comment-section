import { useRef, useState } from "react";

export function EditComment({
  comments,
  setComment,
  id,
  content,
  openForm,
  setOPenForm,
  type,
}) {
  const [editedComment, setEditedComment] = useState("");
  const [editComment, setEditComment] = useState(null);
  const [textArea, setTextArea] = useState("");
  const textAreaDisabled = textArea.length < 40;
  const textareaFocus = useRef(null);

  const handleEdit = (commentId, content) => {
    setEditComment(commentId);
    setEditedComment(content);
    setOPenForm({ commentId, type });
  };
  const handleCancel = () => {
    setEditComment(null);
    setEditedComment("");
  };

  const updatedComments = comments.map((comment) => {
    // return comment.id === editComment
    //   ? { ...comment, content: editComment }
    //   : comment;
    if (comment.id === editComment) {
      return {
        ...comment,
        content: editedComment,
      };
    }
    return comment;
  });

  const handleUpdate = () => {
    textArea.length >= 40 ? setComment(updatedComments) : null;
    setEditComment(null);
    setEditedComment("");
    setOPenForm({ commentId: null, type: null });
  };

  return (
    <>
      {editComment === id && openForm.commentId === id ? (
        <div>
          <textarea
            value={editedComment}
            onChange={(e) => {
              setEditedComment(e.target.value);
              setTextArea(e.target.value);
            }}
            onBlur={() =>
              textArea.length === 0 &&
              setOPenForm({ commentId: null, type: null })
            }
            ref={textareaFocus}
          ></textarea>
          <button onClick={handleUpdate} disabled={textAreaDisabled}>
            Update
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button
          onClick={() => {
            handleEdit(id, content);
            setTimeout(() => {
              textareaFocus.current.focus();
            }, 150);
          }}
        >
          Edit
        </button>
      )}
    </>
  );
}
