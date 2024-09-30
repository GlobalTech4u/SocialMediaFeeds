import { useNavigate } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import EventIcon from "@mui/icons-material/Event";

import "./Sidebar.css";

const Sidebar = (props) => {
  const { showDrawer } = props;

  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

  return (
    <Drawer variant="persistent" open={showDrawer}>
      <ul className="sidebarList">
        <li className="sidebarListItem cursor-pointer" onClick={navigateToHome}>
          <RssFeedIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Feed</span>
        </li>
        <li className="sidebarListItem">
          <ChatIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Chats</span>
        </li>
        <li className="sidebarListItem">
          <GroupIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Groups</span>
        </li>
        <li className="sidebarListItem">
          <BookmarkIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Bookmarks</span>
        </li>
        <li className="sidebarListItem">
          <HelpOutlineIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Questions</span>
        </li>
        <li className="sidebarListItem">
          <WorkOutlineIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Jobs</span>
        </li>
        <li className="sidebarListItem">
          <EventIcon className="sidebarIcon" />
          <span className="sidebarListItemText">Events</span>
        </li>
      </ul>
    </Drawer>
  );
};

export default Sidebar;
