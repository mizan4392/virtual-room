import { Outlet } from "react-router-dom";
import ServerSideBar from "../components/navigation/ServerSideBar";

export default function ServerLayout() {
  return (
    <div>
      <ServerSideBar />
      <Outlet />
      ServerLayout
    </div>
  );
}
