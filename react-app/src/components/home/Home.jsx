import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { ClickAwayListener, Modal } from "@mui/material";

import Navbar from "../navBar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import UserCard from "../userCard/UserCard";
import useDebounce from "../../hooks/useDebounce";
import { getUser } from "../../helpers/user.helper";
import { getUsers } from "../../services/user.service";
import { AuthContext } from "../authContext/AuthContext";

import "./Home.css";
import RightBar from "../rightBar/RightBar";

const Home = () => {
  const { token, loading } = useContext(AuthContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  const onShowSearchResults = () => setShowSearchResults(true);
  const onHideSearchResults = () => setShowSearchResults(false);

  useEffect(() => {
    debouncedSearchQuery
      ? getUsers({ searchQuery: debouncedSearchQuery })
          .then((res) => {
            if (res?.status === 200) {
              setUsers(res?.data?.users);
              onShowSearchResults();
            }
          })
          .catch((error) => {
            setUsers([]);
            onHideSearchResults();
          })
      : onHideSearchResults();
  }, [debouncedSearchQuery]);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const onSearch = (event) => {
    setSearchQuery(event?.target?.value || "");
  };

  return (
    <div className="home-container">
      <Navbar
        toggleDrawer={toggleDrawer}
        onSearch={onSearch}
        firstName={user?.firstName}
        profilePicture={user?.profilePicture?.url}
      />
      <div className="home-body-container">
        <Sidebar showDrawer={showDrawer} />
        <div
          className="home-proteced-routes"
          style={{ marginLeft: showDrawer ? "150px" : "0px" }}
        >
          <Outlet />
        </div>
        <RightBar />
        {showSearchResults && (
          <ClickAwayListener onClickAway={onHideSearchResults}>
            <Modal
              className="search-results-container"
              open={showSearchResults}
              onClose={onHideSearchResults}
            >
              <>
                {users.map((user) => (
                  <UserCard
                    user={user}
                    key={`search-card-${user?._id}`}
                    onHideSearchResults={onHideSearchResults}
                  />
                ))}
              </>
            </Modal>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default Home;
