import { useState } from "react";

export function Scores(props) {
  // const Reply = (props) => {
  const [score, setCount] = useState(props.score);
  const [hasAdded, setHasAdded] = useState(false);

  const add = () => {
    if (hasAdded === false) {
      updateCount(1);
      setHasAdded(true);
    }
  };

  const minus = () => {
    if (hasAdded === true) {
      updateCount(-1);
      setHasAdded(false);
    }
  };

  const updateCount = (total) => {
    setCount(score + total);
  };

  return (
    <div>
      <button onClick={add}>+</button>
      <span>{score}</span>
      <button onClick={minus}>-</button>
    </div>
  );
}
// }
