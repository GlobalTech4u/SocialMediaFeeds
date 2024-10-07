import { axios } from "services/axios.service";

import { URLS_CONSTANT } from "constants/url.constant";

const fetchPostsByUserId = async (payload) => {
  return axios.get(URLS_CONSTANT.posts.replace("{userId}", payload?.userId));
};

const fetchNewsFeeds = async (payload) => {
  return axios.get(
    URLS_CONSTANT.news_feeds.replace("{userId}", payload?.userId)
  );
};

const deletePost = async (payload) => {
  return axios.delete(
    URLS_CONSTANT.post
      .replace("{userId}", payload?.userId)
      .replace("{postId}", payload?.postId)
  );
};

const sharePost = async (userId, payload) => {
  return axios.post(URLS_CONSTANT.posts.replace("{userId}", userId), payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { fetchPostsByUserId, sharePost, deletePost, fetchNewsFeeds };
