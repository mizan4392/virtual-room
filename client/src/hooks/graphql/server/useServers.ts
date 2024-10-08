import { useQuery } from "@apollo/client";

import { GET_SERVERS } from "../../../graphql/queries/Servers";
export function useServers() {
  const { data: servers, loading } = useQuery(GET_SERVERS);

  return { servers: servers?.getServers, loading };
}
