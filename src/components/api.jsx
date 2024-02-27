import dataJson from "./data.json";

export const createComment = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    content: textArea,
    createdAt: new Date().toISOString(),
    score: 12,
    user: dataJson.currentUser,
    replies: [],
  };
};
