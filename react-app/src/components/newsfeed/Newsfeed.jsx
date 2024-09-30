import React, { useState, useEffect } from "react";

import CreatePost from "../createPost/CreatePost";
import { getFullName, getUser } from "../../helpers/user.helper";

const Newsfeed = () => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  const name = getFullName(user?.firstName, user?.lastName);

  return (
    <div className="news-feeds">
      <div className="share-post-container">
        <CreatePost
          getPosts={() => {}}
          profilePicture={user?.profilePicture?.url}
          userId={user?._id}
          name={name}
        />
      </div>
      <div className="view-post-container"></div>
    </div>
  );
};

export default Newsfeed;
