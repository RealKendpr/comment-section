import dataJson from "./data.json";

export const createComment = (textArea) => ({
  id: Math.random().toString(36).substring(2, 9),
  content: textArea,
  createdAt: new Date().toISOString(),
  score: 0,
  user: dataJson.currentUser,
  replies: [],
});

export const createReply = (textArea, commentUsername) => ({
  id: Math.random().toString(36).substring(4, 11),
  content: textArea,
  createdAt: new Date().toISOString(),
  score: 0,
  replyingTo: commentUsername,
  user: dataJson.currentUser,
});
