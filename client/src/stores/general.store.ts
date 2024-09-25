import { create } from "zustand";
import { persist } from "zustand/middleware";
export type Modal = "CreateServer" | "CreateChannel" | "InviteModal";

interface GeneralStore {
  activeModal: Modal | null;
  setActiveModal: (modal: Modal | null) => void;
  drawerOpen: boolean;
  toggleDower: () => void;
}

export const useGeneralStore = create<GeneralStore>()(
  persist(
    (set) => ({
      activeModal: null,
      setActiveModal: (modal) => set({ activeModal: modal }),
      drawerOpen: true,
      toggleDower: () => set((state) => ({ drawerOpen: !state.drawerOpen })),
    }),

    {
      name: "general-store",
    }
  )
);
