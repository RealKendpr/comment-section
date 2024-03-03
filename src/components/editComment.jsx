import { useState } from "react";

export function EditComment({ comments, setComment, id, content }) {
  const [editedComment, setEditedComment] = useState("");
  const [editComment, setEditComment] = useState(null);

  const handleEdit = (commentId, content) => {
    setEditComment(commentId);
    setEditedComment(content);
  };
  const handleCancel = () => {
    setEditComment(null);
    setEditedComment("");
  };

  const handleUpdate = () => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === editComment) {
        return {
          ...comment,
          content: editedComment,
        };
      }
      return comment;
    });
    setComment(updatedComments);
    setEditComment(null);
    setEditedComment("");
  };

  return (
    <>
      {editComment === id ? (
        <div>
          <textarea
            value={editedComment}
            onChange={(e) => setEditedComment(e.target.value)}
          ></textarea>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => handleEdit(id, content)}>Edit</button>
      )}
    </>
  );
}
