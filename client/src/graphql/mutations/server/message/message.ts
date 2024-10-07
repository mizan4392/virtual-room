import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $content: String
    $conversationId: Float
    $channelId: Float
    $file: Upload
  ) {
    createMessage(
      content: $content
      conversationId: $conversationId
      channelId: $channelId
      file: $file
    ) {
      message {
        ... on DirectMessage {
          id
          content
          deleted
          createdAt
          updatedAt
          conversationId
          fileUrl
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
        ... on Message {
          id
          content
          deleted
          createdAt
          updatedAt
          fileUrl
          channel {
            id
          }
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query GetMessages($conversationId: Float, $channelId: Float) {
    getMessages(conversationId: $conversationId, channelId: $channelId) {
      messages {
        ... on DirectMessage {
          id
          content
          deleted
          createdAt
          updatedAt
          conversationId
          fileUrl
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
        ... on Message {
          id
          content
          deleted
          createdAt
          updatedAt
          fileUrl
          channel {
            id
          }
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
      }
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage(
    $messageId: Float!
    $conversationId: Float
    $channelId: Float
  ) {
    deleteMessage(
      messageId: $messageId
      conversationId: $conversationId
      channelId: $channelId
    ) {
      message {
        ... on DirectMessage {
          id
          content

          deleted
          createdAt
          updatedAt
          conversationId
          fileUrl
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
        ... on Message {
          id
          content
          deleted
          createdAt
          updatedAt
          fileUrl
          channel {
            id
          }
          member {
            role
            id
            profileId
            profile {
              email
              id
              name
              imageUrl
            }
          }
        }
      }
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage(
    $messageId: Float!
    $serverId: Float!
    $content: String!
    $conversationId: Float
    $channelId: Float
  ) {
    updateMessage(
      messageId: $messageId
      serverId: $serverId
      content: $content
      conversationId: $conversationId
      channelId: $channelId
    ) {
      message {
        ... on DirectMessage {
          content
          createdAt
          updatedAt
          deleted
        }
        ... on Message {
          content
          createdAt
          updatedAt
          deleted
        }
      }
    }
  }
`;
