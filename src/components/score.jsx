import { useContext, useEffect, useState } from "react";
import dataJson from "../data/data.json";
import { CommentIdContext, CommentContext } from "../context/context";

export function Scores({ score, replyId, username, type }) {
  const [hasAdded, setHasAdded] = useState(false);
  const isCurrentUser = dataJson.currentUser.username === username;
  const isReply = type === "Reply";

  const { comments, setComment } = useContext(CommentContext);
  const commentId = useContext(CommentIdContext);

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
    <span className="scores">
      <button title="add score" onClick={add}>
        <svg
          width="11"
          height="11"
          xmlns="http://www.w3.org/2000/svg"
          fill="#C5C6EF"
        >
          <path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" />
        </svg>
      </button>
      <span>{score}</span>
      <button title="minus score" onClick={minus}>
        <svg
          width="11"
          height="3"
          xmlns="http://www.w3.org/2000/svg"
          fill="#C5C6EF"
        >
          <path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" />
        </svg>
      </button>
    </span>
  );
}
