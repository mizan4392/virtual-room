import { Button, Flex, Modal, Text } from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { useServer } from "../../hooks/graphql/server/useServer";

import { useMutation } from "@apollo/client";

import {
  DeleteServerMutation,
  DeleteServerMutationVariables,
} from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_SERVER } from "../../graphql/mutations/server/server";

export default function DeleteServerModal() {
  const { isOpen, closeModal } = useModal("DeleteServer");

  const { server } = useServer();
  const navigate = useNavigate();
  const [deleteServer, { loading }] = useMutation<
    DeleteServerMutation,
    DeleteServerMutationVariables
  >(DELETE_SERVER, {
    variables: {
      serverId: Number(server?.id),
    },
    refetchQueries: ["GetServers"],
    onCompleted: () => {
      closeModal();
      toast.success("Server deleted successfully");
      navigate(`/`);
    },
  });
  return (
    <Modal opened={isOpen} onClose={closeModal} title="Delete Server">
      <Text fw={700}>Are you sure you want to delete this Server?</Text>
      <Flex justify={"space-between"} mt={"lg"}>
        <Button
          onClick={closeModal}
          variant="light"
          disabled={loading}
          color="green"
        >
          Cancel
        </Button>
        <Button loading={loading} onClick={() => deleteServer()} color="red">
          Delete Server
        </Button>
      </Flex>
    </Modal>
  );
}
