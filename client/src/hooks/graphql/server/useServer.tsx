import { useNavigate, useParams } from "react-router-dom";
import { useProfileStore } from "../../../stores/profile.store";
import { useQuery } from "@apollo/client";
import { GET_SERVER } from "../../../graphql/queries/Servers";
import {
  ChannelType,
  GetServerQuery,
  GetServerQueryVariables,
} from "../../../gql/graphql";

export const useServer = () => {
  const { serverId } = useParams<{ serverId: string }>();
  const profileId = useProfileStore((state) => state.profile?.id);
  const navigate = useNavigate();

  const { data: server, loading } = useQuery<
    GetServerQuery,
    GetServerQueryVariables
  >(GET_SERVER, {
    variables: {
      id: Number(serverId),
    },
    onError: () => {
      navigate("/");
    },
  });
  const textChannels =
    server?.getServer?.channels?.filter(
      (channel) => channel?.type === ChannelType.Text
    ) || [];

  const audioChannels =
    server?.getServer?.channels?.filter(
      (channel) => channel?.type === ChannelType.Audio
    ) || [];

  const videoChannels =
    server?.getServer?.channels?.filter(
      (channel) => channel?.type === ChannelType.Video
    ) || [];

  const members =
    server?.getServer.members?.filter(
      (member) => member?.profileId !== profileId
    ) || [];

  const role = server?.getServer.members?.find(
    (member) => member?.profileId.toString() === profileId
  )?.role;

  return {
    server: server?.getServer,
    textChannels,
    audioChannels,
    videoChannels,
    members,
    role,
    loading,
  };
};
