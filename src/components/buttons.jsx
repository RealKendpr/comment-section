export function Button({ clickAction, value }) {
  return (
    <button className="mini-btn" onClick={clickAction}>
      <img src="./assets/images/icons/icon-reply.svg" alt="" />
      {value}
    </button>
  );
}
