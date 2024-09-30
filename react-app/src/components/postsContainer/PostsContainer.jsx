import * as React from "react";

import PostCard from "../postCard/PostCard";

import "./PostsContainer.css";

const PostsContainer = (props) => {
  const { posts, userId, getPosts } = props;

  return (
    <div className="posts-container">
      {posts?.map((post) => {
        return <PostCard post={post} userId={userId} getPosts={getPosts} />;
      })}
    </div>
  );
};

export default PostsContainer;
