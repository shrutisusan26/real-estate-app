import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest.get("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const res = apiRequest.get("/posts?" + query);
  // console.log(res);
  return defer({ postResponse: res });
};

export const profilePageLoader = async () => {
  const res = apiRequest.get("/users/profilePosts");
  const chatPromise = apiRequest.get("/chats");
  // console.log(chatPromise);
  return defer({ profilePosts: res, chatResponse: chatPromise });
};
