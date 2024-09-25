import { Divider, Flex, Menu, rem, Text } from "@mantine/core";

import { MemberRole, Server } from "../../gql/graphql";
import {
  IconArrowAutofitDown,
  IconEyePlus,
  IconPlus,
  IconSettings,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import { useModal } from "../../hooks/useModal";

type ServerSideBarHeaderProps = {
  server: Server;
  role: MemberRole;
};
export default function ServerSideBarHeader({
  server,
  role,
}: ServerSideBarHeaderProps) {
  const isAdmin = role === MemberRole.Admin;
  const isModerator = role === MemberRole.Moderator || isAdmin;

  const inviteModal = useModal("InviteModal");
  const updateServerModal = useModal("UpdateServer");
  const createChannelModal = useModal("CreateChannel");
  return (
    <Menu shadow="md" width={rem(300)}>
      <Menu.Target>
        <Flex
          style={{ cursor: "pointer" }}
          p={"md"}
          justify={"space-between"}
          align={"center"}
          w={"100%"}
        >
          {server?.name} <IconArrowAutofitDown />
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item rightSection={<IconPlus />} onClick={inviteModal.openModal}>
          Invite people
        </Menu.Item>
        {isAdmin && (
          <Menu.Item
            rightSection={<IconSettings />}
            onClick={updateServerModal.openModal}
          >
            Update server
          </Menu.Item>
        )}
        {isModerator && (
          <Menu.Item
            rightSection={<IconEyePlus />}
            onClick={createChannelModal.openModal}
          >
            Create channel
          </Menu.Item>
        )}
        {isModerator && <Divider />}
        {isAdmin && (
          <Menu.Item color="red" rightSection={<IconTrash />}>
            <Text>Delete server</Text>{" "}
          </Menu.Item>
        )}
        {isAdmin && (
          <Menu.Item color="red" rightSection={<IconX />}>
            <Text>Leave server</Text>{" "}
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}
