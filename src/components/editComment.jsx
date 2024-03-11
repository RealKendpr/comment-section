import { useRef, useState } from "react";

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
  const [textArea, setTextArea] = useState("");
  const textAreaDisabled = textArea.length < 40;
  const textareaFocus = useRef(null);

  const handleEdit = (content) => {
    setCommentValue(content);
    setOPenForm({ commentId, replyId, type });
  };
  const handleCancel = () => {
    setCommentValue("");
    setOPenForm({ commentId: null, type: null });
  };

  const updateComments = comments.map((c) =>
    c.id === commentId
      ? {
          ...c,
          createdAt: new Date().getDate(),
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
              ? { ...r, createdAt: new Date().getDate(), content: commentValue }
              : r
          ),
        }
      : c
  );

  const handleUpdate = () => {
    textArea.length >= 40
      ? isReply
        ? setComment(updateReplies)
        : setComment(updateComments)
      : null;
    setCommentValue("");
    setOPenForm({ commentId: null, type: null });
  };

  return (
    <>
      {openForm.commentId === commentId && openForm.replyId === replyId ? (
        <div>
          <textarea
            value={commentValue}
            onChange={(e) => {
              setCommentValue(e.target.value);
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
            handleEdit(content);
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
