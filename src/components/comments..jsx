import dataJson from "./data.json";
import { Replies } from "./replies";

export function Comments() {
  let eachComments = dataJson.comments;

  return (
    <>
      {eachComments.map((comment) => {
        const { id, user, createdAt, content, score, replies } = comment;
        return (
          <article key={id}>
            <div>
              <img src={user.image.png} alt="" />
              <a href="#">{user.username}</a>
              <div>{createdAt}</div>
            </div>
            <p>{content}</p>
            <div>
              <div className="score">
                <button>+</button>
                <span className="scoreNumber">{score}</span>
                <button>-</button>
              </div>
              <button>Reply</button>
            </div>
            {replies.length > 0 && <Replies></Replies>}
          </article>
        );
      })}
    </>
  );
}
