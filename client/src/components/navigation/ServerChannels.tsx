import {
  IconCamera,
  IconHash,
  IconMessage,
  IconMicrophone,
  IconTrash,
} from "@tabler/icons-react";
import { Channel, ChannelType, MemberRole, Server } from "../../gql/graphql";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { NavLink, rem, Stack } from "@mantine/core";
import { useGeneralStore } from "../../stores/general.store";

type ServerChannelsProps = {
  channel: Channel;
  server?: Server;
  role?: MemberRole;
  isActive: boolean;
};
const iconMap = {
  [ChannelType.Text]: <IconHash size={20} />,
  [ChannelType.Audio]: <IconMicrophone size={20} />,
  [ChannelType.Video]: <IconCamera size={20} />,
};
export default function ServerChannels({
  channel,
  server,
  role,
  isActive,
}: ServerChannelsProps) {
  const deleteChannelModal = useModal("DeleteChannel");
  const updateChannelModal = useModal("UpdateChannel");
  const { setChannelToBeDeletedOrUpdated } = useGeneralStore();
  const navigate = useNavigate();
  if (!channel && !server) {
    return null;
  }
  const Icon = iconMap[channel?.type];
  if (channel?.name !== "General") {
    return (
      <NavLink
        ml={"md"}
        w={rem(260)}
        label={channel.name}
        rightSection={Icon}
        active={isActive}
      >
        {role !== MemberRole.Guest && (
          <Stack>
            <NavLink
              label="Join"
              rightSection={
                <IconMessage size={15} style={{ marginLeft: "rem(8px)" }} />
              }
              onClick={() => {
                navigate(
                  `/servers/${server?.id}/channels/${channel?.type}/${channel?.id}`
                );
              }}
            />
            <NavLink
              label="Delete"
              rightSection={
                <IconTrash size={15} style={{ marginLeft: "rem(8px)" }} />
              }
              onClick={() => {
                setChannelToBeDeletedOrUpdated(Number(channel.id));
                deleteChannelModal.openModal();
              }}
            />
          </Stack>
        )}
      </NavLink>
    );
  }
}
