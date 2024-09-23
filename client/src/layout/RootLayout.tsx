import { Outlet } from "react-router-dom";
import SideBar from "../components/navigation/SideBar";
import { useProfileStore } from "../stores/profile.store";
import { useAuth, useSession } from "@clerk/clerk-react";
import { useMutation } from "@apollo/client";
import {
  CreateProfileMutation,
  CreateProfileMutationVariables,
} from "../gql/graphql";
import { CREATE_PROFILE } from "../graphql/mutations/CreateProfile.gql";
import { useEffect } from "react";

function RootLayout() {
  const { profile, setProfile } = useProfileStore();
  const { session } = useSession();

  const { isSignedIn } = useAuth();
  const [createProfile] = useMutation<
    CreateProfileMutation,
    CreateProfileMutationVariables
  >(CREATE_PROFILE, {});

  useEffect(() => {
    if (!isSignedIn) setProfile(null);
  }, [isSignedIn]);

  useEffect(() => {
    const createProfileFunc = async () => {
      if (!session?.user) return;
      try {
        await createProfile({
          variables: {
            input: {
              email: session.user.emailAddresses[0].emailAddress,
              imageUrl: session.user.imageUrl,
              name: session.user.username || "",
            },
          },
          onCompleted: (data) => {
            setProfile(data.createProfile);
          },
        });
      } catch (err) {
        console.log("Error creating profile in backend", err);
      }
    };
    if (profile?.id) return;
    createProfileFunc();
  }, [session?.user]);
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
}

export default RootLayout;
