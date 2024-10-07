import { useMutation, useQuery } from "@apollo/client";

import { useParams } from "react-router-dom";
import {
  CREATE_MESSAGE,
  GET_MESSAGES,
} from "../../../../graphql/mutations/server/message/message";
import {
  CreateMessageMutation,
  CreateMessageMutationVariables,
  GetMessagesQuery,
  GetMessagesQueryVariables,
} from "../../../../gql/graphql";

export function useMessageData() {
  const [createMessage] = useMutation<
    CreateMessageMutation,
    CreateMessageMutationVariables
  >(CREATE_MESSAGE);

  const { memberId: membId, channelId: chanId, conversationId } = useParams();

  const memberId = Number(membId);
  const channelId = Number(chanId);

  const { data: dataGetMessages } = useQuery<
    GetMessagesQuery,
    GetMessagesQueryVariables
  >(GET_MESSAGES, {
    variables: {
      conversationId: Number(conversationId),
      channelId,
    },
  });

  return {
    memberId,
    channelId,
    createMessage,
    messages: dataGetMessages?.getMessages.messages,
  };
}
