import { gql } from "@apollo/client";

export const CREATE_SERVER = gql`
  mutation CreateServer($input: CreateServerDto!, $file: Upload!) {
    createServer(input: $input, file: $file) {
      id
      name
      imageUrl
      members {
        id
      }
    }
  }
`;

export const UPDATE_SERVER_WITH_NEW_INVITE_CODE = gql`
  mutation UpdateServerWithNewInviteCode($serverId: Float!) {
    updateServerWithNewInviteCode(serverId: $serverId) {
      id
      name
      imageUrl
      inviteCode
    }
  }
`;
