export const createComment = (textArea, currentUser) => ({
  id: Math.random().toString(36).substring(2, 9),
  content: textArea,
  createdAt: new Date().getDate(),
  score: 0,
  user: currentUser,
  replies: [],
});
