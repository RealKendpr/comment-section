import { useEffect, useState } from "react";
import dataJson from "./data.json";

export function Scores({
  comments,
  setComment,
  score,
  commentId,
  replyId,
  username,
  type,
}) {
  const [hasAdded, setHasAdded] = useState(false);
  const isCurrentUser = dataJson.currentUser.username === username;
  const isReply = type === "Reply";

  useEffect(() => {
    const boolean = localStorage.getItem(
      "hasAdded for " + (isReply ? replyId : commentId)
    );
    boolean ? setHasAdded(JSON.parse(boolean)) : null;
  }, [hasAdded]);

  const add = () => {
    isCurrentUser ? null : hasAdded ? null : handleUpdate(1, true);
  };

  const minus = () => {
    isCurrentUser ? null : hasAdded ? handleUpdate(-1, false) : null;
  };

  const handleUpdate = (total, handleHasAdded) => {
    const updateCommentScore = comments.map((c) =>
      c.id === commentId ? { ...c, score: c.score + total } : c
    );

    const updateReplyScore = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId ? { ...r, score: r.score + total } : r
            ),
          }
        : c
    );

    isReply ? setComment(updateReplyScore) : setComment(updateCommentScore);
    setHasAdded(handleHasAdded);
    localStorage.setItem(
      "hasAdded for " + (isReply ? replyId : commentId),
      JSON.stringify(handleHasAdded)
    );
  };

  return (
    <div>
      <button onClick={add}>+</button>
      <span>{score}</span>
      <button onClick={minus}>-</button>
    </div>
  );
}
