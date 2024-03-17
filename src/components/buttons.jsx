export function Button({ clickAction, value }) {
  return (
    <div className="mini-btn-wrapper">
      <button className="mini-btn" onClick={clickAction}>
        {value === "Edit" ? (
          <img src="./assets/images/icons/icon-edit.svg" alt="" />
        ) : value === "Reply" ? (
          <img src="./assets/images/icons/icon-reply.svg" alt="" />
        ) : value === "Delete" ? (
          <img src="./assets/images/icons/icon-reply.svg" alt="" />
        ) : null}
        {value}
      </button>
    </div>
  );
}
