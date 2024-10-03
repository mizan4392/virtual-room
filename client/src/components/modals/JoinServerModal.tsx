import { Button, Modal, Stack, TextInput } from "@mantine/core";
import React from "react";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_MEMBER } from "../../graphql/mutations/server/server";
import {
  AddMemberMutation,
  AddMemberMutationVariables,
} from "../../gql/graphql";
import { toast } from "react-toastify";

export default function JoinServerModal() {
  const { isOpen, closeModal } = useModal("JoinServer");
  const [inviteCode, setInviteCode] = React.useState("");
  const navigate = useNavigate();

  const [addMember, { loading, error, data }] = useMutation<
    AddMemberMutation,
    AddMemberMutationVariables
  >(ADD_MEMBER, {
    variables: {
      inviteCode,
    },
    onCompleted: () => {
      navigate(`/servers/${data?.addMemberToServer?.id}`);
      toast.success("Successfully joined server");
      closeModal();
    },
    refetchQueries: ["GetServers"],
  });
  return (
    <Modal opened={isOpen} onClose={closeModal} title="Join Server">
      <Stack>
        <TextInput
          label="Invite Code"
          onChange={(e) => setInviteCode(e.currentTarget.value)}
          error={error?.message}
        />
        <Button
          disabled={!inviteCode}
          loading={loading}
          onClick={() => addMember()}
        >
          Join Server
        </Button>
      </Stack>
    </Modal>
  );
}
