import classes from "./SideBar.module.css";
import { Button, Center, Stack, useMantineColorScheme } from "@mantine/core";
import {
  IconArrowsJoin,
  IconMoon,
  IconPlus,
  IconSun,
} from "@tabler/icons-react";
import { useModal } from "../../hooks/useModal";
import { UserButton } from "@clerk/clerk-react";
export default function SideBar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { openModal } = useModal("CreateServer");
  return (
    <nav className={classes.navBar}>
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
          <IconArrowsJoin radius={100} />
        </Button>
      </Center>
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
