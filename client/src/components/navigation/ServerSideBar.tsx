import ServerSideBarHeader from "./ServerSideBarHeader";
import classes from "./ServerSideBar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useServer } from "../../hooks/graphql/server/useServer";
import { useEffect } from "react";
export default function ServerSideBar() {
  const navigate = useNavigate();
  const { serverId, memberId, channelId } = useParams();
  const { textChannels } = useServer();

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length > 0) {
      navigate(
        `/servers/${serverId}/channels/TEXT/${Number(textChannels[0]?.id)}`
      );
    }
  }, [memberId, channelId, textChannels]);

  return (
    <nav className={classes.navBar}>
      <ServerSideBarHeader />
    </nav>
  );
}
