/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n": types.CreateProfileDocument,
    "\n  mutation CreateChannel($input: CreateChannelOnServerDto!) {\n    createChannel(input: $input) {\n      id\n      name\n      members {\n        id\n      }\n      imageUrl\n    }\n  }\n": types.CreateChannelDocument,
    "\n  mutation DeleteChannelFromServer($channelId: Float) {\n    deleteChannelFromServer(channelId: $channelId) {\n      id\n    }\n  }\n": types.DeleteChannelFromServerDocument,
    "\n  mutation CreateMessage(\n    $content: String\n    $conversationId: Float\n    $channelId: Float\n    $file: Upload\n  ) {\n    createMessage(\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n      file: $file\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n": types.CreateMessageDocument,
    "\n  query GetMessages($conversationId: Float, $channelId: Float) {\n    getMessages(conversationId: $conversationId, channelId: $channelId) {\n      messages {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetMessagesDocument,
    "\n  mutation DeleteMessage(\n    $messageId: Float!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    deleteMessage(\n      messageId: $messageId\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n": types.DeleteMessageDocument,
    "\n  mutation UpdateMessage(\n    $messageId: Float!\n    $serverId: Float!\n    $content: String!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    updateMessage(\n      messageId: $messageId\n      serverId: $serverId\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n        ... on Message {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n      }\n    }\n  }\n": types.UpdateMessageDocument,
    "\n  mutation CreateServer($input: CreateServerDto!, $file: Upload!) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n": types.CreateServerDocument,
    "\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n": types.UpdateServerWithNewInviteCodeDocument,
    "\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.UpdateServerDocument,
    "\n  mutation LeaveServer($serverId: Float) {\n    leaveServer(serverId: $serverId) {\n      id\n    }\n  }\n": types.LeaveServerDocument,
    "\n  mutation DeleteServer($serverId: Float) {\n    deleteServer(serverId: $serverId) {\n      id\n    }\n  }\n": types.DeleteServerDocument,
    "\n  mutation AddMember($inviteCode: String!) {\n    addMemberToServer(inviteCode: $inviteCode) {\n      id\n    }\n  }\n": types.AddMemberDocument,
    "\n  mutation ChangeMemberRole($memberId: Float, $role: String!) {\n    changeMemberRole(memberId: $memberId, role: $role) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n      }\n    }\n  }\n": types.ChangeMemberRoleDocument,
    "\n  mutation DeleteMember($memberId: Float) {\n    deleteMember(memberId: $memberId) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n    }\n  }\n": types.DeleteMemberDocument,
    "\n  query GetServers {\n    getServers {\n      id\n      name\n      imageUrl\n    }\n  }\n": types.GetServersDocument,
    "\n  query GetServer($id: Float) {\n    getServer(id: $id) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n\n      members {\n        id\n\n        server {\n          id\n        }\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n": types.GetServerDocument,
    "\n  query GetMember($memberId: Float, $serverId: Float) {\n    getMember(memberId: $memberId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n        imageUrl\n        servers {\n          id\n          name\n          channels {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n": types.GetMemberDocument,
    "\n  query GetCurrentMember($profileId: Float, $serverId: Float) {\n    getCurrentMember(profileId: $profileId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n      }\n    }\n  }\n": types.GetCurrentMemberDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n"): (typeof documents)["\n  mutation CreateProfile($input: CreateProfileDto!) {\n    createProfile(input: $input) {\n      id\n      imageUrl\n      name\n      email\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateChannel($input: CreateChannelOnServerDto!) {\n    createChannel(input: $input) {\n      id\n      name\n      members {\n        id\n      }\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation CreateChannel($input: CreateChannelOnServerDto!) {\n    createChannel(input: $input) {\n      id\n      name\n      members {\n        id\n      }\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteChannelFromServer($channelId: Float) {\n    deleteChannelFromServer(channelId: $channelId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteChannelFromServer($channelId: Float) {\n    deleteChannelFromServer(channelId: $channelId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMessage(\n    $content: String\n    $conversationId: Float\n    $channelId: Float\n    $file: Upload\n  ) {\n    createMessage(\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n      file: $file\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMessage(\n    $content: String\n    $conversationId: Float\n    $channelId: Float\n    $file: Upload\n  ) {\n    createMessage(\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n      file: $file\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessages($conversationId: Float, $channelId: Float) {\n    getMessages(conversationId: $conversationId, channelId: $channelId) {\n      messages {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessages($conversationId: Float, $channelId: Float) {\n    getMessages(conversationId: $conversationId, channelId: $channelId) {\n      messages {\n        ... on DirectMessage {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMessage(\n    $messageId: Float!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    deleteMessage(\n      messageId: $messageId\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMessage(\n    $messageId: Float!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    deleteMessage(\n      messageId: $messageId\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          id\n          content\n\n          deleted\n          createdAt\n          updatedAt\n          conversationId\n          fileUrl\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n        ... on Message {\n          id\n          content\n          deleted\n          createdAt\n          updatedAt\n          fileUrl\n          channel {\n            id\n          }\n          member {\n            role\n            id\n            profileId\n            profile {\n              email\n              id\n              name\n              imageUrl\n            }\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMessage(\n    $messageId: Float!\n    $serverId: Float!\n    $content: String!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    updateMessage(\n      messageId: $messageId\n      serverId: $serverId\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n        ... on Message {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMessage(\n    $messageId: Float!\n    $serverId: Float!\n    $content: String!\n    $conversationId: Float\n    $channelId: Float\n  ) {\n    updateMessage(\n      messageId: $messageId\n      serverId: $serverId\n      content: $content\n      conversationId: $conversationId\n      channelId: $channelId\n    ) {\n      message {\n        ... on DirectMessage {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n        ... on Message {\n          content\n          createdAt\n          updatedAt\n          deleted\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateServer($input: CreateServerDto!, $file: Upload!) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateServer($input: CreateServerDto!, $file: Upload!) {\n    createServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n      members {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateServerWithNewInviteCode($serverId: Float!) {\n    updateServerWithNewInviteCode(serverId: $serverId) {\n      id\n      name\n      imageUrl\n      inviteCode\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateServer($input: UpdateServerDto!, $file: Upload) {\n    updateServer(input: $input, file: $file) {\n      id\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation LeaveServer($serverId: Float) {\n    leaveServer(serverId: $serverId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation LeaveServer($serverId: Float) {\n    leaveServer(serverId: $serverId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteServer($serverId: Float) {\n    deleteServer(serverId: $serverId) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteServer($serverId: Float) {\n    deleteServer(serverId: $serverId) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddMember($inviteCode: String!) {\n    addMemberToServer(inviteCode: $inviteCode) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation AddMember($inviteCode: String!) {\n    addMemberToServer(inviteCode: $inviteCode) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeMemberRole($memberId: Float, $role: String!) {\n    changeMemberRole(memberId: $memberId, role: $role) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeMemberRole($memberId: Float, $role: String!) {\n    changeMemberRole(memberId: $memberId, role: $role) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMember($memberId: Float) {\n    deleteMember(memberId: $memberId) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteMember($memberId: Float) {\n    deleteMember(memberId: $memberId) {\n      id\n      name\n      imageUrl\n      members {\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServers {\n    getServers {\n      id\n      name\n      imageUrl\n    }\n  }\n"): (typeof documents)["\n  query GetServers {\n    getServers {\n      id\n      name\n      imageUrl\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetServer($id: Float) {\n    getServer(id: $id) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n\n      members {\n        id\n\n        server {\n          id\n        }\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetServer($id: Float) {\n    getServer(id: $id) {\n      id\n      profileId\n      name\n      imageUrl\n      inviteCode\n      channels {\n        id\n        type\n        name\n      }\n\n      members {\n        id\n\n        server {\n          id\n        }\n        id\n        role\n        profileId\n        profile {\n          id\n          name\n          imageUrl\n          email\n        }\n      }\n      profile {\n        id\n        name\n        imageUrl\n        email\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMember($memberId: Float, $serverId: Float) {\n    getMember(memberId: $memberId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n        imageUrl\n        servers {\n          id\n          name\n          channels {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMember($memberId: Float, $serverId: Float) {\n    getMember(memberId: $memberId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n        imageUrl\n        servers {\n          id\n          name\n          channels {\n            id\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCurrentMember($profileId: Float, $serverId: Float) {\n    getCurrentMember(profileId: $profileId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCurrentMember($profileId: Float, $serverId: Float) {\n    getCurrentMember(profileId: $profileId, serverId: $serverId) {\n      id\n      role\n      profile {\n        id\n        name\n        email\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;