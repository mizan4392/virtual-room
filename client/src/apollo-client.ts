import { InMemoryCache } from "@apollo/client/cache";
import { ApolloClient } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev";

loadDevMessages();
loadErrorMessages();
const getCookies = (name: string) => {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) return parts.pop()?.split(";").shift();
};

//authLink
const authLink = setContext(async (_, { headers }) => {
  const token = getCookies("__session");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//TODO: add wensocket link

//uploadLink
const uploadLink = createUploadLink({
  uri: "http://localhost:3000/graphql",
  headers: {
    "apollo-require-preflight": "true",
  },
});

//errorLink
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

//TODO: split link for websocket and http

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(uploadLink)),
  cache,
});

export default client;
