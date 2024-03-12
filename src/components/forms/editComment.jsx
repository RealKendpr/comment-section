import { useEffect, useRef, useState } from "react";

export function EditComment({
  comments,
  setComment,
  commentId,
  replyId,
  content,
  openForm,
  setOPenForm,
  type,
  isReply,
}) {
  const [commentValue, setCommentValue] = useState("");
  const commentValueDisabled = commentValue.length === 0;
  const textareaFocus = useRef(null);

  const handleEdit = (content) => {
    setCommentValue(content);
    setOPenForm({ commentId, replyId, type });
  };
  const handleCancel = () => {
    setCommentValue("");
    setOPenForm({ commentId: null, replyId: null, type: null });
  };

  const updateComments = comments.map((c) =>
    c.id === commentId
      ? {
          ...c,
          createdAt: new Date().toISOString(),
          content: commentValue,
        }
      : c
  );

  const updateReplies = comments.map((c) =>
    c.id === commentId
      ? {
          ...c,
          replies: c.replies.map((r) =>
            r.id === replyId
              ? {
                  ...r,
                  createdAt: new Date().toISOString(),
                  content: commentValue,
                }
              : r
          ),
        }
      : c
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    commentValueDisabled === false
      ? isReply
        ? setComment(updateReplies)
        : setComment(updateComments)
      : null;
    setCommentValue("");
    setOPenForm({ commentId: null, replyId: null, type: null });
  };

  useEffect(() => {
    openForm.commentId === commentId &&
    openForm.replyId === replyId &&
    openForm.type === type
      ? textareaFocus.current.focus()
      : null;
  }, [openForm]);

  return (
    <>
      <div
        className={
          openForm.commentId === commentId &&
          openForm.replyId === replyId &&
          openForm.type === type
            ? "edit-form"
            : "hidden-form"
        }
      >
        <form id="edit-form" onSubmit={handleUpdate}>
          <textarea
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
            onBlur={() =>
              commentValueDisabled &&
              setOPenForm({ commentId: null, replyId: null, type: null })
            }
            ref={textareaFocus}
          ></textarea>
          <button className="solid-btn" disabled={commentValueDisabled}>
            Update
          </button>
        </form>
        {/* ) : ( // <button onClick={handleCancel}>Cancel</button> */}
      </div>
      {openForm.commentId === commentId &&
      openForm.replyId === replyId &&
      openForm.type === type ? null : (
        <button className="mini-btn" onClick={() => handleEdit(content)}>
          Edit
        </button>
      )}
    </>
  );
}