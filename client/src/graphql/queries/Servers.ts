import { gql } from "@apollo/client";

export const GET_SERVERS = gql`
  query GetServers {
    getServers {
      id
      name
      imageUrl
    }
  }
`;

// export const GET_SERVER = gql`
//   query GetServer($id: Float!) {
//     getServer(id: $id) {
//       id
//       profileId
//       name
//       imageUrl
//       inviteCode
//       members {
//         id
//         role
//         profileId
//         profile {
//           id
//           name
//           imageUrl
//           email
//         }
//       }
//       channels {
//         id
//         name
//         type
//         members {
//           id
//           role
//           profileId
//           profile {
//             id
//             name
//             imageUrl
//             email
//           }
//         }
//       }
//       profile {
//         id
//         name
//         imageUrl
//         email
//       }
//     }
//   }
// `;

export const GET_SERVER = gql`
  query GetServer($id: Float) {
    getServer(id: $id) {
      id
      profileId
      name
      imageUrl
      inviteCode
      channels {
        id
        type
        name
      }

      members {
        id

        server {
          id
        }
        id
        role
        profileId
        profile {
          id
          name
          imageUrl
          email
        }
      }
      profile {
        id
        name
        imageUrl
        email
      }
    }
  }
`;
