import { gql } from "@apollo/client";

export const GET_MEMBER = gql`
  query GetMember($memberId: Float, $serverId: Float) {
    getMember(memberId: $memberId, serverId: $serverId) {
      id
      role
      profile {
        id
        name
        email
        imageUrl
        servers {
          id
          name
          channels {
            id
            name
            type
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_MEMBER = gql`
  query GetCurrentMember($profileId: Float, $serverId: Float) {
    getCurrentMember(profileId: $profileId, serverId: $serverId) {
      id
      role
      profile {
        id
        name
        email
      }
    }
  }
`;
