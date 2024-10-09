import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { ClickAwayListener, Modal } from "@mui/material";

import Navbar from "components/navBar/NavBar";
import Sidebar from "components/sidebar/Sidebar";
import RightBar from "components/rightBar/RightBar";
import UserCard from "components/userCard/UserCard";
import { AuthContext } from "components/authContext/AuthContext";
import useDebounce from "hooks/useDebounce";
import { getUser } from "helpers/user.helper";
import { getUsers } from "services/user.service";

import "./Home.css";

const Home = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);
  const [showDrawer, setShowDrawer] = useState(true);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(searchQuery);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

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

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  const onSearch = (event) => {
    setSearchQuery(event?.target?.value || "");
  };

  if (loading) {
    return null;
  }

  return (
    <div className="home-container">
      <Navbar
        toggleDrawer={toggleDrawer}
        onSearch={onSearch}
        firstName={user?.firstName}
        profilePicture={user?.profilePicture?.path}
        onShowSearchResults={onShowSearchResults}
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
              open={showSearchResults && users?.length > 0}
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
