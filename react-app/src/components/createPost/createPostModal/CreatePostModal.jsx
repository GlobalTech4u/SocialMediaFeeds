import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { socket } from "../../../utils/socket";

import { Avatar, Button, Modal } from "@mui/material";
import { red } from "@mui/material/colors";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import Textarea from "@mui/joy/Textarea";

import { sharePost } from "../../../services/post.service";
import { fileTypes } from "../../../constants/common.constant";
import "./CreatePostModal.css";

const CreatePostModal = (props) => {
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const {
    profilePicture,
    getPosts,
    showCreatePostModal,
    onHideCreatePostModal,
    userId,
    name,
    followers,
  } = props;

  const onChangeContent = (event) => {
    setContent(event?.target?.value);
  };

  const onPostFileUpload = (attachments) => {
    if (attachments?.length > 0) {
      return setFiles(attachments);
    }
    if (files?.length > 0) {
      return setFiles(files);
    }

    return setFiles([]);
  };

  const onSharePost = async () => {
    if (content || files?.length > 0) {
      const payload = {
        content: content,
        postAttachments: files,
      };

      sharePost(userId, payload)
        .then((res) => {
          if (res?.status === 201) {
            socket?.emit("add_post", {
              userId: userId,
              followers: followers,
            });
            getPosts();
            onHideCreatePostModal();
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Modal
      open={showCreatePostModal}
      onClose={onHideCreatePostModal}
      aria-labelledby="modal-create-post"
    >
      <div className="modal-container">
        <div className="modal-body">
          <div className="modal-header">
            <h2 className="modal-title">Create Post</h2>
            <HighlightOffRoundedIcon
              className="modal-close-icon cursor-pointer"
              onClick={onHideCreatePostModal}
            />
          </div>
          <div className="model-content">
            <div className="avtar-container">
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={profilePicture}
              />
              <span>{name}</span>
            </div>
            <div className="write-post-container">
              <Textarea
                className="post-editor"
                required
                minRows={2}
                maxRows={3}
                placeholder="What's on your mind ?"
                size="md"
                name="content"
                onChange={onChangeContent}
                value={content}
              />
            </div>
            <div>
              <FileUploader
                multiple={true}
                handleChange={onPostFileUpload}
                name="postAttachments"
                types={fileTypes}
              />
            </div>
            <div className="attachments-container">
              <div className="share-option">
                <PhotoLibraryIcon color="primary" />
                <span className="shareOptionText">Photo or Video</span>
              </div>
              <div className="share-option">
                <AddLocationAltIcon color="primary" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="share-option">
                <SentimentVerySatisfiedIcon color="primary" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <div className="share-post-container">
              <Button variant="contained" fullWidth onClick={onSharePost}>
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
