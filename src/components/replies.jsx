import dataJson from "./data.json";
import { Scores } from "./score";

export function Replies() {
  // let Comments = dataJson.comments;
  let currentUser = dataJson.currentUser.username;

  return (
    <>
      <div id="replies">
        {dataJson.comments.map((comment) => {
          return comment.replies.map((reply) => {
            const { id, content, createdAt, replyingTo, user } = reply;
            return (
              <article key={id}>
                <div>
                  <img src={user.image.png} alt="" />
                  <a href="#">{user.username}</a>
                  <div>{createdAt}</div>
                </div>
                <p>
                  <a href="#">{"@" + replyingTo}</a>
                  {content}
                </p>
                <div>
                  <Scores {...reply}></Scores>
                  {user.username === currentUser ? (
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
