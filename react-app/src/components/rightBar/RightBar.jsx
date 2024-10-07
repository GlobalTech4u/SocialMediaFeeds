import * as React from "react";

import { Card, CardHeader, CardContent, Avatar } from "@mui/material";

import "./RightBar.css";

const RightBar = () => {
  return (
    <div className="right-bar-container">
      <Card>
        <CardHeader title={"Online Friends"} />
        <CardContent className="online-friends">
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Rohit Kumar"}</span>
          </div>
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="online-friend">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
        </CardContent>
      </Card>
      <Card className="right-bar">
        <CardHeader title={"Suggested for you"} />
        <CardContent className="suggestions">
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Rohit Kumar"}</span>
          </div>
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
          <div className="suggestion">
            <Avatar>S</Avatar>
            <span>{"Shubham Saxena"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RightBar;
