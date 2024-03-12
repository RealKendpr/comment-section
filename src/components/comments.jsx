import { useEffect, useState } from "react";
import dataJson from "./data.json";
import { Replies } from "./replies";
import { Scores } from "./score";
import { Delete } from "./delete";
import { EditComment } from "./editComment";
import { InputForm } from "./InputForms";
import TimeAgo from "react-timeago";

export function Comments() {
  const currentUser = dataJson.currentUser;
  const [comments, setComment] = useState(() => {
    const localValue = localStorage.getItem("COMMENTS");
    localValue === null && [];
    return localValue ? JSON.parse(localValue) : dataJson.comments;
  });

  useEffect(() => {
    localStorage.setItem("COMMENTS", JSON.stringify(comments));
  }, [comments]);

  const [openForm, setOPenForm] = useState({
    commentId: null,
    replyId: null,
    type: null,
  });

  return (
    <>
      {comments.map((comment) => {
        const { id, user, createdAt, content, replies } = comment;
        return (
          <div key={id}>
            <article key={id}>
              <div>
                <div className="comment">
                  <div className="comment-info">
                    <img src={user.image.png} alt="" />
                    <a href="#">{user.username}</a> &nbsp;
                    <div>
                      {createdAt.includes("ago") ? (
                        <time>{createdAt}</time>
                      ) : (
                        <TimeAgo date={createdAt} live={false}></TimeAgo>
                      )}
                    </div>
                  </div>
                  <p>{content}</p>
                </div>
                <Scores
                  comments={comments}
                  setComment={setComment}
                  score={comment.score}
                  commentId={id}
                  username={user.username}
                ></Scores>
                {user.username === currentUser.username && (
                  <div className="comment-operations">
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
              </div>
            </article>
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
        );
      })}
      <div className="userInputs">
        <InputForm
          comments={comments}
          setComment={setComment}
          openForm={openForm}
          setOPenForm={setOPenForm}
          type="CommentForm"
        ></InputForm>
      </div>
    </>
  );
}
