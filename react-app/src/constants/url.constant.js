const BASE_URL = process.env.REACT_APP_BASE_API_URL + "/";

const URLS_CONSTANT = {
  login: BASE_URL + "api/auth/login",
  users: BASE_URL + "api/users",
  user: BASE_URL + "api/users/{userId}",
  users_search: BASE_URL + "api/users/search/{searchQuery}",
  user_follow: BASE_URL + "api/users/{userId}/follow",
  user_unfollow: BASE_URL + "api/users/{userId}/unfollow",
  news_feeds: BASE_URL + "api/users/{userId}/posts/newsfeed",
  posts: BASE_URL + "api/users/{userId}/posts",
  post: BASE_URL + "api/users/{userId}/posts/{postId}",
};

export { URLS_CONSTANT };
