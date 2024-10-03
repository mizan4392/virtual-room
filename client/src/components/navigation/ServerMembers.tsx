import { Member, MemberRole } from "../../gql/graphql";
import { Image, NavLink, rem } from "@mantine/core";
import { IconCrown, IconShieldCheck } from "@tabler/icons-react";

type ServerMemberProps = {
  member: Member;

  isActive: boolean;
};

const roleIconMap = {
  [MemberRole.Gest]: null,
  [MemberRole.Moderator]: <IconShieldCheck size="15" />,
  [MemberRole.Admin]: <IconCrown size="15" />,
};

export default function ServerMembers({ member, isActive }: ServerMemberProps) {
  //   const { getOrCreateConversation } = useConversation(member?.id);
  //   const navigate = useNavigate();

  return (
    <NavLink
      w={rem(260)}
      ml="md"
      onClick={() => {
        // getOrCreateConversation({
        //   onCompleted: (data) => {
        //     navigate(
        //       `/servers/${member?.server?.id}/conversations/${data.getOrCreateConversation.id}/members/TEXT/${member?.id}`
        //     );
        //   },
        // });
      }}
      active={isActive}
      label={member?.profile?.name}
      leftSection={
        <Image
          w={rem(25)}
          h={rem(25)}
          radius={25}
          src={member?.profile?.imageUrl}
        />
      }
      rightSection={roleIconMap[member?.role]}
    />
  );
}
