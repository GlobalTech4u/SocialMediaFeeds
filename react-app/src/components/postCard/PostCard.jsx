import * as React from "react";
import moment from "moment";

import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
// import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { getFullName } from "helpers/user.helper";
import { deletePost } from "services/post.service";

import "./PostCard.css";

const ITEM_HEIGHT = 48;

const options = ["Delete"];

const PostCard = (props) => {
  const { post, userId, getPosts } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSubMenuClick = async (option) => {
    if (option === "Delete") {
      const payload = {
        userId: userId,
        postId: post?._id,
      };
      deletePost(payload)
        .then((res) => {
          if (res?.status === 204) {
            getPosts();
          }
        })
        .catch((error) => console.log(error));
    }

    handleClose();
  };

  const userName = getFullName(post.firstName, post.lastName);

  return (
    <Card
      className="post-card"
      sx={{ width: 482 }}
      key={`post-card-${post?._id}`}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            aria-label="recipe"
            src={post?.profilePicture?.path}
          />
        }
        action={
          userId === post?.userId && (
            <div>
              <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? "long-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                MenuListProps={{
                  "aria-labelledby": "long-button",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                  paper: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "20ch",
                    },
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleSubMenuClick(option)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          )
        }
        title={userName}
        subheader={moment(post?.updatedAt).format("YYYY/MM/DD kk:mm")}
      />
      <div className="post-card-attachments">
        {post?.documents?.map((document) => {
          return (
            <CardMedia
              key={`post-card-media-${document?.asset_id}`}
              component="img"
              image={document?.path}
              alt="post-image"
            />
          );
        })}
      </div>
      <CardContent className="post-card-content">
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {post?.content}
        </Typography>
      </CardContent>
      <CardActions className="post-card-footer" disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default PostCard;
