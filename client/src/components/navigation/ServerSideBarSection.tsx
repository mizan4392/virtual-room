import React from "react";
import { ChannelType, MemberRole } from "../../gql/graphql";
import { useModal } from "../../hooks/useModal";
import { useGeneralStore } from "../../stores/general.store";
import { Flex, Tooltip, Text } from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";

type ServerSideBarSectionProps = {
  sectionType: "CHANNELS" | "MEMBERS";
  channelType?: ChannelType;
  role: MemberRole;
  label: string;
};

export default function ServerSideBarSection({
  sectionType,
  channelType,
  role,
  label,
}: ServerSideBarSectionProps) {
  const channelModal = useModal("CreateChannel");
  const manageMembersModal = useModal("ManageMembers");
  const { setChannelType } = useGeneralStore();
  const handleOnchange = () => {
    setChannelType(channelType || ChannelType.Text);
    channelModal.openModal();
  };
  if (role !== MemberRole.Gest && sectionType === "CHANNELS") {
    return (
      <Tooltip label="Create channel" withArrow onClick={handleOnchange}>
        <Flex p={"md"} style={{ cursor: "pointer" }}>
          <Flex justify={"space-between"} w={"100%"}>
            <Text fw={700}>{label}</Text>
            <IconPlus size={20} />
          </Flex>
        </Flex>
      </Tooltip>
    );
  }

  if (role === MemberRole.Admin && sectionType === "MEMBERS") {
    return (
      <Tooltip
        label="Manage members"
        withArrow
        onClick={manageMembersModal.openModal}
      >
        <Flex p={"md"} style={{ cursor: "pointer" }}>
          <Flex justify={"space-between"} w={"100%"}>
            <Text fw={700}>{label}</Text>
            <IconSettings />
          </Flex>
        </Flex>
      </Tooltip>
    );
  }

  if (role !== MemberRole.Admin && sectionType === "MEMBERS") {
    return (
      <Flex p="md">
        <Flex justify={"space-between"} w="100%">
          <Text fw={700}>{label}</Text>
        </Flex>
      </Flex>
    );
  }
  return <div>ServerSideBarSection</div>;
}
