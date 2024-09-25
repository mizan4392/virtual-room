import React, { useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Button, Flex, Modal, Stack, TextInput } from "@mantine/core";
import { useServer } from "../../hooks/graphql/server/useServer";
import { useClipboard } from "@mantine/hooks";
import { useMutation } from "@apollo/client";
import { UPDATE_SERVER_WITH_NEW_INVITE_CODE } from "../../graphql/mutations/server/server";
import {
  UpdateServerWithNewInviteCodeMutation,
  UpdateServerWithNewInviteCodeMutationVariables,
} from "../../gql/graphql";
import { useForm } from "@mantine/form";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export default function InviteModal() {
  const { isOpen, closeModal } = useModal("InviteModal");
  const { server } = useServer();

  const clipBoard = useClipboard({
    timeout: 1000,
  });

  const [updateServerWithNewInviteCode, { loading }] = useMutation<
    UpdateServerWithNewInviteCodeMutation,
    UpdateServerWithNewInviteCodeMutationVariables
  >(UPDATE_SERVER_WITH_NEW_INVITE_CODE, {
    variables: {
      serverId: Number(server?.id),
    },
  });
  const form = useForm({
    initialValues: {
      inviteCode: "",
    },
  });

  useEffect(() => {
    if (!server?.inviteCode) return;
    form.setValues({ inviteCode: server.inviteCode });
  }, [server]);

  return (
    <Modal opened={isOpen} onClose={closeModal} title="Invite people ">
      <Stack>
        <Flex>
          <TextInput
            w={"100%"}
            label="Server invite code"
            {...form.getInputProps("inviteCode")}
            rightSection={
              <div onClick={clipBoard.copy} style={{ cursor: "pointer" }}>
                {!clipBoard.copied ? <IconCopy /> : <IconCheck color="green" />}
              </div>
            }
          />
        </Flex>
        <Button
          onClick={() => {
            updateServerWithNewInviteCode();
          }}
          loading={loading}
          disabled={loading}
        >
          Generate new invite code
        </Button>
      </Stack>
    </Modal>
  );
}
