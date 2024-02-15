import dataJson from "./data.json";

export function Replies() {
  let eachComments = dataJson.comments;
  let currentUser = dataJson.currentUser.username;

  return (
    <>
      <div id="replies">
        {eachComments.map((comment) => {
          const { replies } = comment;
          return replies.map((replly) => {
            const { id, content, createdAt, score, replyingTo, user } = replly;
            return (
              <article key={id}>
                <div>
                  <img src={user.image.png} alt="" />
                  <a href="#">{user.username}</a>
                  <div>{createdAt}</div>
                </div>
                <p>
                  {"@" + replyingTo + " "}
                  {content}
                </p>
                <div>
                  <div className="score">
                    <button>+</button>
                    <span className="scoreNumber">{score}</span>
                    <button>-</button>
                  </div>
                  {user.username.includes(currentUser) ? (
                    <div>
                      <button>Edit</button>
                      <button>Delete</button>
                    </div>
                  ) : (
                    <button>Reply</button>
                  )}
                </div>
              </article>
            );
          });
        })}
      </div>
    </>
  );
}

// let list = {
//   task: [
//     subTask[
//       {
//         1: "Task1",
//         2: "Task 2",
//       }
//     ],
//   ],
//   task: [
//     subTask[
//       {
//         1: "Task1",
//         2: "Task 2",
//         3: "Task 3",
//       }
//     ],
//   ],
// };
