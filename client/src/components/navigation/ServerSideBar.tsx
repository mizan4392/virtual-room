import ServerSideBarHeader from "./ServerSideBarHeader";
import classes from "./ServerSideBar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useServer } from "../../hooks/graphql/server/useServer";
import { useEffect, useState } from "react";
import { ScrollArea, Stack } from "@mantine/core";
import ServerSideBarSection from "./ServerSideBarSection";
import ServerChannels from "./ServerChannels";
import { ChannelType } from "../../gql/graphql";
export default function ServerSideBar() {
  const navigate = useNavigate();
  const { serverId, memberId, channelId } = useParams();
  const { textChannels, server, role, audioChannels, videoChannels } =
    useServer();
  const [activeChannelId, setActiveChannelId] = useState<number | null>(null);
  const [activeMemberId, setActiveMemberId] = useState<number | null>(null);

  useEffect(() => {
    if (memberId) {
      setActiveMemberId(parseInt(memberId));
      setActiveChannelId(null);
    }
    if (channelId) {
      setActiveChannelId(parseInt(channelId));
      setActiveMemberId(null);
    }
  }, [channelId, memberId, textChannels]);

  useEffect(() => {
    if (!channelId && !memberId && textChannels.length > 0) {
      navigate(
        `/servers/${serverId}/channels/TEXT/${Number(textChannels[0]?.id)}`
      );
    }
  }, [memberId, channelId, textChannels]);

  const activeChannel = Number(channelId);
  if (!server || !role) return null;

  return (
    <nav className={classes.navBar}>
      <ServerSideBarHeader server={server} role={role} />
      <ScrollArea>
        {!!textChannels?.length && (
          <ServerSideBarSection
            sectionType="CHANNELS"
            channelType={ChannelType.Text}
            role={role}
            label="Text Channels"
          />
        )}
        <Stack>
          {textChannels?.map((channel) => (
            <ServerChannels
              key={channel?.id}
              channel={channel}
              role={role}
              server={server}
              isActive={activeChannelId === Number(channel?.id)}
            />
          ))}
        </Stack>

        {!!audioChannels?.length && (
          <ServerSideBarSection
            sectionType="CHANNELS"
            channelType={ChannelType.Audio}
            role={role}
            label="Audio Channels"
          />
        )}
        <Stack>
          {audioChannels?.map((channel) => (
            <ServerChannels
              key={channel?.id}
              channel={channel}
              role={role}
              server={server}
              isActive={activeChannelId === Number(channel?.id)}
            />
          ))}
        </Stack>

        {!!videoChannels?.length && (
          <ServerSideBarSection
            sectionType="CHANNELS"
            channelType={ChannelType.Video}
            role={role}
            label="Video Channels"
          />
        )}
        <Stack>
          {videoChannels?.map((channel) => (
            <ServerChannels
              key={channel?.id}
              channel={channel}
              role={role}
              server={server}
              isActive={activeChannelId === Number(channel?.id)}
            />
          ))}
        </Stack>
      </ScrollArea>
    </nav>
  );
}
