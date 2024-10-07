import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChannelType } from "../gql/graphql";
export type Modal =
  | "CreateServer"
  | "CreateChannel"
  | "InviteModal"
  | "UpdateServer"
  | "ManageMembers"
  | "DeleteChannel"
  | "UpdateChannel"
  | "DeleteServer"
  | "JoinServer"
  | "UpdateMessage";

interface GeneralStore {
  activeModal: Modal | null;
  setActiveModal: (modal: Modal | null) => void;
  drawerOpen: boolean;
  toggleDower: () => void;
  channelType: ChannelType;
  setChannelType: (channelType: ChannelType) => void;

  channelToBeDeletedOrUpdated: number | null;
  setChannelToBeDeletedOrUpdated: (channelId: number | null) => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
      drawerOpen: true,
      toggleDower: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
      channelType: ChannelType.Text,
      setChannelType: (channelType) => set({ channelType }),
      channelToBeDeletedOrUpdated: null,
      setChannelToBeDeletedOrUpdated(channelId) {
        set({ channelToBeDeletedOrUpdated: channelId });
      },
    }),

    {
      name: "general-store",
    }
  )
);
