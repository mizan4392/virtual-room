import { Button, Flex, Modal, Text } from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { useServer } from "../../hooks/graphql/server/useServer";
import { useGeneralStore } from "../../stores/general.store";
import { useMutation } from "@apollo/client";
import { DELETE_CHANNEL_FROM_SERVER } from "../../graphql/mutations/server/channel";
import {
  DeleteChannelFromServerMutation,
  DeleteChannelFromServerMutationVariables,
} from "../../gql/graphql";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function DeleteChannelModal() {
  const { isOpen, closeModal } = useModal("DeleteChannel");
  const { channelToBeDeletedOrUpdated } = useGeneralStore();
  const { server } = useServer();
  const navigate = useNavigate();
  const [deleteChannel, { loading }] = useMutation<
    DeleteChannelFromServerMutation,
    DeleteChannelFromServerMutationVariables
  >(DELETE_CHANNEL_FROM_SERVER, {
    variables: {
      channelId: channelToBeDeletedOrUpdated,
    },
    refetchQueries: ["GetServer"],
    onCompleted: () => {
      closeModal();
      toast.success("Channel deleted successfully");
      navigate(`/servers/${server?.id}`);
    },
  });
  return (
    <Modal opened={isOpen} onClose={closeModal} title="Delete Channel">
      <Text fw={700}>Are you sure you want to delete this channel?</Text>
      <Flex justify={"space-between"} mt={"lg"}>
        <Button
          onClick={closeModal}
          variant="light"
          disabled={loading}
          color="green"
        >
          Cancel
        </Button>
        <Button loading={loading} onClick={() => deleteChannel()} color="red">
          Delete Channel
        </Button>
      </Flex>
    </Modal>
  );
}
