export function Button({ clickAction, value }) {
  return <button onClick={clickAction}>{value}</button>;
}
