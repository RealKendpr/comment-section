import dataJson from "./data.json";
import { Replies } from "./replies";
import { Scores } from "./score";

export function Comments() {
  let eachComments = dataJson.comments;

  return (
    <>
      {eachComments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <article key={id}>
            <div>
              <img src={user.image.png} alt="" />
              <a href="#">{user.username}</a>
              <div>{createdAt}</div>
            </div>
            <p>{content}</p>
            <div>
              <Scores {...comment}></Scores>
              <button>Reply</button>
            </div>
            {replies.length > 0 && <Replies></Replies>}
          </article>
        );
      })}
    </>
  );
}
