import { useEffect, useState } from "react";
import dataJson from "./data.json";
import { createComment as createCommentApi } from "./api";

function CommentForm() {
  const currentUser = dataJson.currentUser;
  const [commentList, addComment] = useState(dataJson.comments);
  const [textArea, setTextArea] = useState([]);

  const obj = {
    id: 6,
    content: "fsfsffsf",
    createdAt: "1 month ago",
    score: 12,
    user: {
      image: {
        png: "./src/components/assets/images/avatars/image-maxblagun.png",
        webp: "./images/avatars/image-maxblagun.webp",
      },
      username: "hdjdj",
    },
    replies: [],
  };

  // useEffect(() => {
  //   addComment((prev) => [...prev, obj]);
  // }, [obj]);

  const submitForm = (e) => {
    e.preventDefault();
    // obj;
    addComment((prev) => [...prev, obj]);
    console.log(commentList);
    console.log(addComment);
    console.log(textArea);
  };
  // commentList;
  console.log(commentList);
  // console.log(addComment);

  const commentTemp = () => {
    return {
      id: Math.random().toString(36).substring(2, 9),
      id: "45678",
      content: textArea,
      createdAt: new Date().toISOString(),
      user: currentUser,
    };
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <textarea
          value={textArea}
          onChange={(e) => setTextArea(e.target.value)}
        ></textarea>
        <button>Send</button>
      </form>
    </>
  );
}

// function CommentForm(props) {
//   // const [backendComments, setBackendComment] = useState([]);

//   const text = useState("");
//   const [commentList, setComment] = useState(dataJson.comments);

//   const textAreaDisabled = text.length === 0;

//   const onSubmit = (event) => {
//     event.preventDefault();
//     addComment;
//     text("");
//     // setText("");
//   };

//   const addComment = (text, parentId) => {
//     console.log(text, parentId);
//     createCommentApi(text, parentId).then((comment) => {
//       setComment([comment, ...commentList]);
//     });
//   };

//   return (
//     <>
//       <form onSubmit={onSubmit}>
//         <textarea
//           className="comment-form-textarea"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         ></textarea>
//         <div>
//           <img src={currentUser.image.png} alt="" />
//           <button className="comment-form-button" disabled={textAreaDisabled}>
//             SEND
//           </button>
//         </div>
//       </form>
//     </>
//   );
// }

export default CommentForm;

// const obj = [
//   {
//     id: 1,
//     content:
//       "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit, inventore!",
//     createdAt: "2 weeks ago",
//   },
//   {
//     id: 2,
//     content:
//       "Sit amet consectetur adipisicing elit. Reprehenderit, lorem ipsum dolor inventore!",
//     createdAt: "3 weeks ago",
//   },
// ];
