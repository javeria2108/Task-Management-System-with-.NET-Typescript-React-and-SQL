import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch } from "../redux/hooks";
import { clearCredentials } from "../redux/slices/AuthSlice";
import { clearUser } from "../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onLogoutClick = () => {
    dispatch(clearCredentials());
    dispatch(clearUser());
    navigate("/login");
  };
  return (
    <div className="flex flex-col px-5 py-10 text-white">
      <div className="flex flex-row gap-2 px-2 py-4 hover:bg-pink focus:bg-pink rounded-lg hover:cursor-pointer ">
        <FontAwesomeIcon icon="power-off" size="2x" />
        <p className="text-lg">My Profile</p>
      </div>
      <div className="flex flex-row gap-2 px-2 py-4 hover:bg-pink focus:bg-pink rounded-lg hover:cursor-pointer">
        <FontAwesomeIcon icon="power-off" size="2x" />
        <p className="text-lg">Dashboard</p>
      </div>
      <div className="flex flex-row gap-2 px-2 py-4 hover:bg-pink focus:bg-pink rounded-lg hover:cursor-pointer">
        <FontAwesomeIcon icon="power-off" size="2x" />
        <p className="text-lg">My Tasks</p>
      </div>
      <div className="flex flex-row gap-2 px-2 py-4 hover:bg-pink focus:bg-pink rounded-lg hover:cursor-pointer">
        <FontAwesomeIcon icon="power-off" size="2x" />
        <p className="text-lg">Team</p>
      </div>
      <div
        className="flex flex-row gap-2 px-2 py-4 hover:bg-pink focus:bg-pink rounded-lg hover:cursor-pointer"
        onClick={() => onLogoutClick()}
      >
        <FontAwesomeIcon icon="power-off" size="2x" />
        <p className="text-lg">Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
