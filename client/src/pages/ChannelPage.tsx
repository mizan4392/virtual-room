import { useParams } from "react-router-dom";
import { ChannelType } from "../gql/graphql";
import ChatWindow from "../components/modals/chat/ChatWindow";

export default function ChannelPage() {
  const { channelId, channelType } = useParams<{
    channelId: string;
    channelType: ChannelType;
  }>();
  return (
    <div>
      <ChatWindow
        chatName={channelId}
        chatType="channel"
        channelType={channelType}
      />
    </div>
  );
}
