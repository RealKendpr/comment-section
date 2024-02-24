import dataJson from "./data.json";

export const createComment = async (text, parentId = null) => {
  let currentUser = dataJson.currentUser;

  return {
    // id: Math.random().toString(36).substring(2, 9),
    id: "45678",
    content: text,
    createdAt: new Date().toISOString(),
    score: undefined,
    parentId,
    user: currentUser,
  };
};
