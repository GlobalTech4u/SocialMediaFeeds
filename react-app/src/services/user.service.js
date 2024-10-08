import { axios } from "services/axios.service";

import { URLS_CONSTANT } from "constants/url.constant";

const createUser = async (payload) => {
  return axios.post(URLS_CONSTANT.users, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getUsers = async (payload) => {
  return axios.get(
    URLS_CONSTANT.users_search.replace("{searchQuery}", payload?.searchQuery)
  );
};

const getUserById = async (payload) => {
  return axios.get(URLS_CONSTANT.user.replace("{userId}", payload?.userId));
};

const followUser = async (userId, payload) => {
  return axios.put(
    URLS_CONSTANT.user_follow.replace("{userId}", userId),
    payload,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

const unfollowUser = async (userId, payload) => {
  return axios.put(
    URLS_CONSTANT.user_unfollow.replace("{userId}", userId),
    payload,
    {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }
  );
};

export { createUser, getUsers, getUserById, followUser, unfollowUser };
