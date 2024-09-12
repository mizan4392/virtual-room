import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";

function RootLayout() {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
