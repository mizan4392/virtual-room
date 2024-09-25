import React from "react";
import { useGeneralStore } from "../../stores/general.store";
import SideBar from "./SideBar";
import { Drawer, rem } from "@mantine/core";
import ServerSideBar from "./ServerSideBar";

export default function MobileSideBar() {
  const { drawerOpen, toggleDower } = useGeneralStore();
  return (
    <>
      <SideBar />
      <Drawer
        padding={"0"}
        mb={"0"}
        zIndex={10}
        opened={drawerOpen}
        size={rem(320)}
        position="left"
        withOverlay={false}
        style={{ position: "fixed" }}
        withCloseButton={false}
        ml={rem(80)}
        onClose={() => toggleDower()}
      >
        <ServerSideBar />
      </Drawer>
    </>
  );
}
