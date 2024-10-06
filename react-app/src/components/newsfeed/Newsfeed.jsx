import React, { useState, useEffect } from "react";
import { socket } from "../../utils/socket";

import CreatePost from "../createPost/CreatePost";
import PostsContainer from "../postsContainer/PostsContainer";
import { getFullName, getUser } from "../../helpers/user.helper";
import { fetchNewsFeeds } from "../../services/post.service";

import "./Newsfeed.css";

const Newsfeed = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    getPosts();
  }, [user]);

  useEffect(() => {
    socket?.on("post_added", ({ userId }) => {
      console.log(`post added by ${userId}`);
      getPosts();
    });
  }, [socket]);

  const getPosts = async (userId) => {
    user?._id &&
      fetchNewsFeeds({ userId: userId || user?._id })
        .then((res) => {
          const posts = res?.data?.posts;
          setPosts(posts);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  const name = getFullName(user?.firstName, user?.lastName);
  const followers = user?.followers?.map((follower) => follower?._id);

  return (
    <div className="news-feeds">
      <div className="share-post-container">
        <CreatePost
          getPosts={() => {}}
          profilePicture={user?.profilePicture?.url}
          userId={user?._id}
          name={name}
          followers={followers}
        />
      </div>
      <div className="view-post-container">
        <PostsContainer posts={posts} userId={user?._id} getPosts={getPosts} />
      </div>
    </div>
  );
};

export default Newsfeed;
