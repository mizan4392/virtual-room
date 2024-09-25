import {
  Button,
  Flex,
  Group,
  Modal,
  rem,
  Stack,
  Image,
  TextInput,
} from "@mantine/core";
import { useModal } from "../../hooks/useModal";
import { Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import classes from "./CreateServerModal.module.css";
import { IconUpload, IconX } from "@tabler/icons-react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_SERVER } from "../../graphql/mutations/server/server";
import {
  CreateServerMutation,
  CreateServerMutationVariables,
} from "../../gql/graphql";
import { useProfileStore } from "../../stores/profile.store";
import { toast } from "react-toastify";

export default function CreateServerModal() {
  const { isOpen, closeModal } = useModal("CreateServer");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { profile } = useProfileStore();
  const [createServer, { loading }] = useMutation<
    CreateServerMutation,
    CreateServerMutationVariables
  >(CREATE_SERVER, {});
  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => !value.trim() && "Server name is required",
    },
    initialErrors: {
      name: "Server name is required",
    },
  });

  const onSubmit = async () => {
    if (!form.validate()) return;
    if (!file) {
      toast.error("Please upload an image");
      return;
    }
    if (profile) {
      createServer({
        variables: {
          input: {
            name: form.values.name,
            profileId: parseInt(profile.id),
          },
          file,
        },
        onCompleted: () => {
          toast("Server created successfully");
          setFile(null);
          setImagePreview(null);
          form.reset();
          closeModal();
        },
        refetchQueries: ["GetServers"],
      });
    }
  };

  const handleDropZoneChange: DropzoneProps["onDrop"] = (files) => {
    if (files?.length === 0) {
      return setImagePreview(null);
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    setFile(files[0]);
    reader.readAsDataURL(files[0]);
  };

  const clearState = () => {
    setImagePreview(null);
    setFile(null);
    form.reset();
  };
  return (
    <Modal
      title="Create a server"
      opened={isOpen}
      onClose={() => {
        closeModal();
        clearState();
      }}
    >
      <Text c={"dimmed"}>
        Give your server a name and icon.You can always change these later.
      </Text>
      <form onSubmit={form.onSubmit(() => onSubmit())}>
        <Stack>
          <Flex justify={"center"} align={"center"} direction={"column"}>
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => {
                  handleDropZoneChange(files);
                }}
                className={classes.dropZone}
                mt={"md"}
                accept={IMAGE_MIME_TYPE}
              >
                <Group
                  style={{
                    minHeight: rem(100),
                    pointerEvents: "none",
                  }}
                >
                  <Dropzone.Accept>
                    <IconUpload size={"3.25rem"} stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size={"3.25rem"} stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size={"3.25rem"} stroke={1.5} />
                  </Dropzone.Idle>
                  <>
                    <Text size="xl">Drag image here or click to upload </Text>
                    <Text size="sm" c={"dimmed"} inline mt={7}>
                      Upload a server icon
                    </Text>
                  </>
                </Group>
              </Dropzone>
            )}

            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt={"md"}>
                <>
                  <Button
                    color="red"
                    pos={"absolute"}
                    style={{
                      zIndex: 1,
                      padding: 0,
                      width: rem(30),
                      height: rem(30),
                      top: 0,
                      right: 15,
                    }}
                    onClick={() => {
                      setImagePreview(null);
                      setFile(null);
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    alt="Server icon"
                    w={rem(150)}
                    h={rem(150)}
                    radius={"50%"}
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server name"
            placeholder="Name:"
            required
            {...form.getInputProps("name")}
            error={form.errors.name}
          />
          <Button
            disabled={form.values.name.trim() || !loading ? false : true}
            w="30%"
            type="submit"
            variant="gradient"
            mt={"md"}
          >
            Create
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
