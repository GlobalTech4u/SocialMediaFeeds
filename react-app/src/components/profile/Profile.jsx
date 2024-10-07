import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";

import PostsContainer from "components/postsContainer/PostsContainer";
import CreatePost from "components/createPost/CreatePost";
import { AuthContext } from "components/authContext/AuthContext";
import { fetchPostsByUserId } from "services/post.service";
import { getFullName, getUser } from "helpers/user.helper";

import "./Profile.css";

const Profile = () => {
  const { token, loading } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    const user = getUser();
    setUser(user);
    user?._id &&
      fetchPostsByUserId({ userId: user?._id })
        .then((res) => {
          const posts = res?.data?.posts;
          setPosts(posts);
        })
        .catch((error) => {
          console.log(error);
        });
  };

  React.useEffect(() => {
    getPosts();
  }, []);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const name = getFullName(user?.firstName, user?.lastName);

  return (
    <div className="profile-container">
      <div className="profile-body-container">
        <div className="share-post-container">
          <CreatePost
            getPosts={getPosts}
            profilePicture={user?.profilePicture?.url}
            userId={user?._id}
            name={name}
          />
        </div>
        <div className="view-post-container">
          <PostsContainer
            posts={posts}
            userId={user?._id}
            getPosts={getPosts}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
