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

export const UPDATE_SERVER = gql`
  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {
    updateServer(input: $input, file: $file) {
      id
      name
      imageUrl
    }
  }
`;

export const LEAVE_SERVER = gql`
  mutation LeaveServer($serverId: Float) {
    leaveServer(serverId: $serverId) {
      id
    }
  }
`;

export const DELETE_SERVER = gql`
  mutation DeleteServer($serverId: Float) {
    deleteServer(serverId: $serverId) {
      id
    }
  }
`;

export const ADD_MEMBER = gql`
  mutation AddMember($inviteCode: String!) {
    addMemberToServer(inviteCode: $inviteCode) {
      id
    }
  }
`;
