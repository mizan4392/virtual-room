import classes from "./SideBar.module.css";
import {
  Button,
  Center,
  rem,
  Stack,
  Tooltip,
  UnstyledButton,
  useMantineColorScheme,
  Image,
} from "@mantine/core";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useModal } from "../../hooks/useModal";
import { UserButton } from "@clerk/clerk-react";
import { useServers } from "../../hooks/graphql/server/useServers";
import { Server } from "../../gql/graphql";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type NavBarLinkProps = {
  label: string;
  active?: boolean;
  imageUrl: string;
  onClick?: () => void;
};

function NavBarLink({ label, active, imageUrl, onClick }: NavBarLinkProps) {
  return (
    <Tooltip label={label} position="right">
      <UnstyledButton
        onClick={onClick}
        data-active={active || undefined}
        variant="transparent"
        style={{ borderRadius: rem(100) }}
      >
        <Image src={imageUrl} alt="alt" w={rem(50)} h={rem(50)} radius={100} />
      </UnstyledButton>
    </Tooltip>
  );
}
export default function SideBar() {
  const [active, setActive] = useState(0);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { openModal } = useModal("CreateServer");

  const { servers, loading }: { servers: Server[]; loading: boolean } =
    useServers();

  const navigate = useNavigate();

  const serverLinks = servers?.map((server, index) => (
    <NavBarLink
      key={server.id}
      label={server.name}
      imageUrl={server.imageUrl}
      onClick={() => {
        setActive(index);
        navigate(`/servers/${server.id}`);
      }}
    />
  ));
  return (
    <nav className={classes.navBar}>
      <Stack>
        <Center>
          <Button
            className={classes.link}
            variant="subtle"
            radius={100}
            onClick={openModal}
          >
            <IconPlus radius={100} />
          </Button>
        </Center>
        <Center>
          <Button className={classes.link} variant="subtle" radius={100}>
            <IconArrowsJoin className={classes.icon} radius={100} />
          </Button>
        </Center>
        <Stack justify="center" gap={"md"}>
          {serverLinks}
        </Stack>
      </Stack>
      <Stack justify="center" align="center">
        <Button
          className={classes.link}
          variant="subtle"
          radius={100}
          onClick={toggleColorScheme}
        >
          {colorScheme === "dark" ? (
            <IconMoon radius={100} />
          ) : (
            <IconSun radius={100} />
          )}
        </Button>
        <UserButton />
      </Stack>
    </nav>
  );
}
