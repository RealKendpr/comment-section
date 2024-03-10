import { useEffect, useState } from "react";
import dataJson from "./data.json";

export function Scores({ comments, setComment, score, commentId, username }) {
  let currentUser = dataJson.currentUser;
  const [hasAdded, setHasAdded] = useState(false);

  useEffect(() => {
    const boolean = localStorage.getItem("hasAdded for " + commentId);
    boolean ? setHasAdded(JSON.parse(boolean)) : null;
  }, [hasAdded]);

  const add = () => {
    username === currentUser.username
      ? null
      : hasAdded
      ? null
      : handleUpdate(1, true);
  };

  const minus = () => {
    username === currentUser.username
      ? null
      : hasAdded
      ? handleUpdate(-1, false)
      : null;
  };

  const handleUpdate = (total, handleHasAdded) => {
    const updateCommentScore = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, score: comment.score + total }
        : comment
    );

    setComment(updateCommentScore);
    setHasAdded(handleHasAdded);
    localStorage.setItem(
      "hasAdded for " + commentId,
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
