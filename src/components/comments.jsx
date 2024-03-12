import dataJson from "./data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import { Delete } from "./delete";
import { EditComment } from "./editComment";
import { InputForm } from "./InputForms";
import TimeAgo from "react-timeago";

export function Comments({ comments, setComment, openForm, setOPenForm }) {
  const currentUser = dataJson.currentUser;

  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <div key={id} className="comment-wrapper">
            <div className="mid-wrapper">
              <article key={id} className="comment">
                <div className="comment-info">
                  <img src={user.image.png} alt="" />
                  <a href="#">{user.username}</a> &nbsp;
                  {createdAt.includes("ago") ? (
                    <time>{createdAt}</time>
                  ) : (
                    <TimeAgo date={createdAt} live={false}></TimeAgo>
                  )}
                </div>
                {openForm.commentId === id &&
                openForm.type === "EditForm" ? null : (
                  <p>{content}</p>
                )}
              </article>
              <Scores
                comments={comments}
                setComment={setComment}
                score={comment.score}
                commentId={id}
                username={user.username}
              ></Scores>
            </div>
            <div className="comment-operations">
              {user.username === currentUser.username && (
                <div className="user-operations">
                  <EditComment
                    comments={comments}
                    setComment={setComment}
                    commentId={id}
                    content={content}
                    openForm={openForm}
                    setOPenForm={setOPenForm}
                    type="EditForm"
                  ></EditComment>
                  <Delete
                    comments={comments}
                    setComment={setComment}
                    commentId={id}
                    username={user.username}
                  ></Delete>
                </div>
              )}
              <Replies
                commentUsername={user.username}
                currentUser={currentUser}
                replies={replies}
                comments={comments}
                setComment={setComment}
                commentId={id}
                openForm={openForm}
                setOPenForm={setOPenForm}
              ></Replies>
            </div>
          </div>
        );
      })}
      <InputForm
        comments={comments}
        setComment={setComment}
        openForm={openForm}
        setOPenForm={setOPenForm}
        type="CommentForm"
      ></InputForm>
    </div>
  );
}
