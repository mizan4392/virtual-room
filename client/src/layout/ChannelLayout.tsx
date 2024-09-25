import React from "react";
import MobileSideBar from "../components/navigation/MobileSideBar";
import { Outlet } from "react-router-dom";

export default function ChannelLayout() {
  return (
    <div>
      <MobileSideBar />
      <Outlet />
    </div>
  );
}
