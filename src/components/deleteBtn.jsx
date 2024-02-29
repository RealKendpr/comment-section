export function DeleteBtn({ handleDelete }) {
  return <button onClick={handleDelete}>Delete</button>;
}

export function ConfirmDelete({
  showConfirmation,
  handleCancel,
  handleConfirm,
}) {
  return (
    <>
      {showConfirmation && (
        <div>
          <p>Are You Sure YOu want to delete this comment?</p>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      )}
    </>
  );
}
