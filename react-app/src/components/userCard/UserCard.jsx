import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Avatar, Card, CardContent, Typography } from "@mui/material";

import { getFullName } from "helpers/user.helper";

import "./UserCard.css";

const UserCard = (props) => {
  const { user, onHideSearchResults } = props;
  const navigate = useNavigate();

  const navigateToUserProfile = () => {
    onHideSearchResults();
    navigate(`user?userId=${user?._id}`);
  };

  return (
    <Card
      className="user-search-card-container cursor-pointer"
      sx={{ marginTop: 2, marginLeft: 3, marginRight: 3 }}
      onClick={navigateToUserProfile}
      key={`search-${user?._id}`}
    >
      <CardContent className="user-search-card-content">
        <Avatar aria-label="recipe" src={user?.profilePicture?.url} />
        <Typography variant="body2" color="textSecondary">
          {getFullName(user?.firstName, user?.lastName)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default UserCard;
