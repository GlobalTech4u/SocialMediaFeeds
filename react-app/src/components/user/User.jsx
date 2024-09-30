import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@mui/material";

import { getUserById, onfollowUser } from "../../services/user.service";
import { getFullName, getUser } from "../../helpers/user.helper";

import "./User.css";
import PostsContainer from "../postsContainer/PostsContainer";
import { fetchPostsByUserId } from "../../services/post.service";

const User = () => {
  const [search] = useSearchParams();
  const [openedUser, setOpenedUser] = useState({});
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

  useEffect(() => {
    getPosts();
  }, []);

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  useEffect(() => {
    const userId = search.get("userId");
    getUserById({ userId: userId })
      .then((res) => {
        if (res?.status === 200) {
          setOpenedUser(res?.data?.user);
        }
      })
      .catch((error) => setOpenedUser({}));
  }, [search]);

  const name = getFullName(openedUser?.firstName, openedUser?.lastName);

  const onFollow = () => {
    const payload = {
      userId: openedUser?._id,
    };

    onfollowUser(user?._id, payload)
      .then((res) => {
        if (res?.status === 200) {
          getUserById({ userId: user?._id }).then((res) => {
            setUser(res?.data?.user);
            localStorage.setItem("user", JSON.stringify(res?.data?.user));
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const isFollowing = user?.following?.some(
    (followingUser) => followingUser?._id === openedUser?._id
  );

  return (
    <div className="user-profile">
      <div className="user-profile-header">
        <div>
          <img
            className="user-profile-picture"
            aria-label="recipe"
            src={openedUser?.profilePicture?.url}
            alt={`${openedUser?.firstName}-profile-picture`}
          />
        </div>
        <div className="user-profile-content">
          <div className="user-profile-details">{name}</div>
          <div className="user-profile-details">
            <div>
              {posts?.length === 1 ? "1 post" : `${posts?.length || 0} posts`}
            </div>
            <div>
              {openedUser?.followers?.length === 1
                ? "1 follower"
                : `${openedUser?.followers?.length || 0} followers`}
            </div>
            <div>
              {openedUser?.following?.length === 1
                ? "1 following"
                : `${openedUser?.following?.length || 0} following`}
            </div>
          </div>
          <div className="user-profile-actions">
            {isFollowing ? (
              <Button className="user-profile-action-button" onClick={() => {}}>
                Unfollow
              </Button>
            ) : (
              <Button className="user-profile-action-button" onClick={onFollow}>
                Follow
              </Button>
            )}
            <Button className="user-profile-action-button">Block</Button>
          </div>
        </div>
      </div>
      <div className="user-profile-posts-container">
        <PostsContainer posts={posts} userId={user?._id} getPosts={getPosts} />
      </div>
    </div>
  );
};

export default User;
