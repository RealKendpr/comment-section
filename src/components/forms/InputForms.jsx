import { useContext, useEffect, useRef, useState } from "react";
import { createReply, createComment } from "../../utils/api";
import dataJson from "../../data/data.json";
import {
  CommentIdContext,
  CommentContext,
  OpenFormContext,
} from "../../context/context";

export function InputForm({ commentUsername, replyId, type }) {
  const currentUser = dataJson.currentUser;
  const [commentValue, setCommentValue] = useState("");
  const textareaFocus = useRef(null);

  const textareaDisabled = commentValue.length === 0;
  const newReply = createReply(commentValue, commentUsername);
  const newComment = createComment(commentValue);

  const isCommentForm = type === "CommentForm";
  const commentId = useContext(CommentIdContext);
  const { comments, setComment } = useContext(CommentContext);
  const { openForm, setOPenForm } = useContext(OpenFormContext);

  const updatedReplies = comments.map((c) =>
    c.id === commentId
      ? {
          ...c,
          replies: [...c.replies, newReply],
        }
      : c
  );
  const submitForm = (e) => {
    e.preventDefault();
    textareaDisabled === false
      ? isCommentForm
        ? setComment([...comments, newComment])
        : setComment(updatedReplies)
      : null;
    setCommentValue("");
    setOPenForm({ commentId: null, type: null });
  };

  useEffect(() => {
    // openForm.commentId === commentId && openForm.replyId === replyId &&
    openForm.type === type ? textareaFocus.current.focus() : null;
  }, [openForm]);

  return (
    <>
      {isCommentForm ? (
        <div className="card user-comment-input">
          <form className="comment-form" onSubmit={submitForm}>
            <div className="img-wrapper">
              <img src={currentUser.image.png} alt="" />
            </div>
            <textarea
              id="comment-input"
              value={commentValue}
              placeholder="Add a comment..."
              onChange={(e) => setCommentValue(e.target.value)}
              onFocus={() => setOPenForm({ commentId: null, type: null })}
            ></textarea>
            <label htmlFor="comment-input" className="hidden">
              Add Comment
            </label>
            <button className="solid-btn" disabled={textareaDisabled}>
              SEND
            </button>
          </form>
        </div>
      ) : type === "ReplyToComment" ? (
        <div
          className={
            // "card reply-form"
            "card " +
            (openForm.type === type && openForm.commentId === commentId
              ? "reply-form"
              : "hidden-form")
          }
          id="ReplyToComment"
        >
          <div className="img-wrapper">
            <img src={currentUser.image.png} alt="" />
          </div>
          <form onSubmit={submitForm}>
            <textarea
              value={commentValue}
              placeholder="Add a reply..."
              onChange={(e) => setCommentValue(e.target.value)}
              onBlur={() =>
                textareaDisabled && setOPenForm({ commentId: null, type: null })
              }
              ref={textareaFocus}
            ></textarea>
            <button className="solid-btn" disabled={textareaDisabled}>
              REPLY
            </button>
          </form>
        </div>
      ) : (
        type === "ReplyToReply" && (
          <div
            className={
              "card " +
              (openForm.type === type && openForm.replyId === replyId
                ? "reply-form"
                : "hidden-form")
            }
            id="ReplyToReply"
          >
            <div>
              <img src={currentUser.image.png} alt="" />
            </div>
            <form onSubmit={submitForm}>
              <textarea
                value={commentValue}
                placeholder="Add a reply..."
                onChange={(e) => setCommentValue(e.target.value)}
                onBlur={() =>
                  textareaDisabled &&
                  setOPenForm({ commentId: null, replyId: null, type: null })
                }
                ref={textareaFocus}
              ></textarea>
              <button className="solid-btn" disabled={textareaDisabled}>
                REPLY
              </button>
            </form>
          </div>
        )
      )}
    </>
  );
}

// const addReplyToComment = (commentId, newReply) => {
//   const updatedComments = comments.map((comment) => {
//     if (comment.id === commentId) {
//       return {
//         ...comment,
//         replies: [...comment.replies, newReply],
//       };
//     }
//     return comment;
//   });
//   setComment(updatedComments);
// };

{
  /* {comment.replies.map((reply) => (
    <div key={reply.id}>{reply.content}</div>
    ))} */
}
