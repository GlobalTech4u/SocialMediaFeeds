import axios from "axios";

import { URLS_CONSTANT } from "../constants/url.constant";

const createUser = async (payload) => {
  return axios.post(URLS_CONSTANT.register, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const loginUser = async (payload) => {
  return axios.post(URLS_CONSTANT.login, payload, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export { createUser, loginUser };
