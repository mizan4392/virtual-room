import { gql } from "@apollo/client";

export const CREATE_CHANNEL = gql`
  mutation CreateChannel($input: CreateChannelOnServerDto!) {
    createChannel(input: $input) {
      id
      name
      members {
        id
      }
      imageUrl
    }
  }
`;

export const DELETE_CHANNEL_FROM_SERVER = gql`
  mutation DeleteChannelFromServer($channelId: Float) {
    deleteChannelFromServer(channelId: $channelId) {
      id
    }
  }
`;
