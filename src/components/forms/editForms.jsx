import { useContext, useEffect, useRef } from "react";
import {
  CommentIdContext,
  CommentContext,
  OpenFormContext,
  commentValueContext,
} from "../../context/context";

export function EditForms({ replyId, type, isReply }) {
  const { commentValue, setCommentValue } = useContext(commentValueContext);
  const commentValueDisabled = commentValue.length === 0;
  const textareaFocus = useRef(null);

  const { comments, setComment } = useContext(CommentContext);
  const { openForm, setOPenForm } = useContext(OpenFormContext);
  const commentId = useContext(CommentIdContext);

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
    // openForm.commentId === commentId && openForm.replyId === replyId &&
    openForm.type === type ? textareaFocus.current.focus() : null;
  }, [openForm]);

  return (
    <>
      {isReply ? (
        <div
          className={
            openForm.type === type && openForm.replyId === replyId
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
        </div>
      ) : (
        <div
          className={
            openForm.type === type && openForm.commentId === commentId
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
        </div>
      )}
    </>
  );
}

{
  /* ) : ( // <button onClick={handleCancel}>Cancel</button> */
}
{
  /* {openForm.commentId === commentId &&
    openForm.replyId === replyId &&
    openForm.type === type ? null : (
      <button className="mini-btn" onClick={() => handleEdit(content)}>
      <img src="./assets/images/icons/icon-edit.svg" alt="" />
      Edit
      </button>
      )} */
}

// const handleEdit = (content) => {
//   setCommentValue(content);
//   setOPenForm({ commentId, replyId, type });
// };
// const handleCancel = () => {
//   setCommentValue("");
//   setOPenForm({ commentId: null, replyId: null, type: null });
// };

// const [commentValue, setCommentValue] = useState("");
