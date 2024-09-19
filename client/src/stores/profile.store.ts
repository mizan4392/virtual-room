import { create } from "zustand";
import { Profile } from "../gql/graphql";
import { persist } from "zustand/middleware";

interface ProfileStore {
  profile: Profile | null;
  setProfile: (profile: Profile | null) => void;
}

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      profile: null,
      setProfile: (profile: Profile | null) => set({ profile: profile }),
    }),
    {
      name: "profile-store",
    }
  )
);
