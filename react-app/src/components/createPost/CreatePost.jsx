import { useState } from "react";

import { Card, CardActions, Avatar } from "@mui/material";
import { red } from "@mui/material/colors";
import Textarea from "@mui/joy/Textarea";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";

import CreatePostModal from "./createPostModal/CreatePostModal";
import "./CreatePost.css";

const CreatePost = (props) => {
  const { getPosts, profilePicture, userId, name } = props;
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  const onShowCreatePostModal = () => setShowCreatePostModal(true);
  const onHideCreatePostModal = () => setShowCreatePostModal(false);

  return (
    <Card sx={{ maxWidth: 450 }} className="create-post-container">
      <div className="write-post-container">
        <Avatar
          sx={{ bgcolor: red[500] }}
          aria-label="recipe"
          src={profilePicture}
        />
        <Textarea
          className="post-editor cursor-pointer"
          required
          minRows={2}
          maxRows={3}
          placeholder="What's on your mind ?"
          size="md"
          onClick={onShowCreatePostModal}
        />
      </div>
      <CardActions className="attachments-container">
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <PhotoLibraryIcon color="primary" />
          <span className="shareOptionText">Photo or Video</span>
        </div>
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <AddLocationAltIcon color="primary" />
          <span className="shareOptionText">Location</span>
        </div>
        <div
          className="share-option cursor-pointer"
          onClick={onShowCreatePostModal}
        >
          <SentimentVerySatisfiedIcon color="primary" />
          <span className="shareOptionText">Feelings</span>
        </div>
        <CreatePostModal
          profilePicture={profilePicture}
          getPosts={getPosts}
          showCreatePostModal={showCreatePostModal}
          onHideCreatePostModal={onHideCreatePostModal}
          userId={userId}
          name={name}
        />
      </CardActions>
    </Card>
  );
};

export default CreatePost;
