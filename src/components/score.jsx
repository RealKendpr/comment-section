import { useEffect, useState } from "react";
import dataJson from "../data/data.json";

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
  const storageId = "hasAdded for " + (isReply ? replyId : commentId);

  useEffect(() => {
    const boolean = localStorage.getItem(storageId);
    boolean ? setHasAdded(JSON.parse(boolean)) : null;
    localStorage.removeItem(boolean === "false" ? storageId : null);
  }, [hasAdded]);

  const add = () => {
    isCurrentUser ? null : hasAdded ? null : handleUpdate(1, true);
  };

  const minus = () => {
    isCurrentUser ? null : hasAdded ? handleUpdate(-1, false) : null;
  };

  const handleUpdate = (value, handleHasVoted) => {
    const updateCommentScore = comments.map((c) =>
      c.id === commentId ? { ...c, score: c.score + value } : c
    );

    const updateReplyScore = comments.map((c) =>
      c.id === commentId
        ? {
            ...c,
            replies: c.replies.map((r) =>
              r.id === replyId ? { ...r, score: r.score + value } : r
            ),
          }
        : c
    );

    isReply ? setComment(updateReplyScore) : setComment(updateCommentScore);
    setHasAdded(handleHasVoted);
    localStorage.setItem(storageId, JSON.stringify(handleHasVoted));
  };

  return (
    <div className="scores">
      <button onClick={add}>+</button>
      <span>{score}</span>
      <button onClick={minus}>-</button>
    </div>
  );
}
