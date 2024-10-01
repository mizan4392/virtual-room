import { useModal } from "../../hooks/useModal";
import {
  Button,
  Flex,
  Group,
  Modal,
  rem,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useGeneralStore } from "../../stores/general.store";
import { useForm } from "@mantine/form";
import { useServer } from "../../hooks/graphql/server/useServer";
import { useMutation } from "@apollo/client";
import {
  ChannelType,
  CreateChannelMutation,
  CreateChannelMutationVariables,
} from "../../gql/graphql";
import { CREATE_CHANNEL } from "../../graphql/mutations/server/channel";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function CreateChannelModal() {
  const { isOpen, closeModal } = useModal("CreateChannel");
  const { channelType } = useGeneralStore();

  useEffect(() => {
    if (!channelType) return;
    form.setFieldValue("type", channelType);
  }, [channelType]);
  const form = useForm({
    initialValues: {
      name: "",
      type: channelType,
    },
    validate: {
      name: (value) =>
        !value.trim()
          ? "Channel name is required"
          : value === "general"
          ? "Channel name cannot be general"
          : null,

      type: (value) => (!value.trim() ? "Channel type is required" : null),
    },
    validateInputOnChange: true,
  });

  const { server } = useServer();

  const [createChannel, { loading, error }] = useMutation<
    CreateChannelMutation,
    CreateChannelMutationVariables
  >(CREATE_CHANNEL, {
    variables: {
      input: {
        name: form.values.name,
        serverId: Number(server?.id),
        type: form.values.type,
      },
    },
    refetchQueries: ["GetServer"],
    onCompleted: () => {
      toast.success("Channel created");
      closeModal();
      form.reset();
    },
  });
  return (
    <Modal opened={isOpen} onClose={closeModal} title="Create Channel">
      <Stack>
        <Flex direction={"column"} h={rem(250)}>
          <TextInput
            mb={"md"}
            label="Channel name"
            {...form.getInputProps("name")}
            error={form.errors.name || error?.message}
          ></TextInput>
          <Select
            {...form.getInputProps("type")}
            label="Channel type"
            data={Object.values(ChannelType).map((type) => type)}
          />
        </Flex>
        <Group>
          <Button
            color="red"
            onClick={() => {
              closeModal();
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              createChannel();
            }}
            loading={loading}
            disabled={
              !form.values.name ||
              !form.values.type ||
              loading ||
              !!error?.message
            }
          >
            Create Channel
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
