import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import HomePage from "./pages/HomePage.tsx";
import CreateServerModal from "./components/modals/CreateServerModal.tsx";
import client from "./apollo-client.ts";
import { ApolloProvider } from "@apollo/client";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};
const RouterComponent = () => {
  const navigate = useNavigate();
  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}
    >
      <Routes>
        <Route path="" element={<RootLayout />}>
          <Route
            index
            element={
              <ProtectedRoutes>
                <CreateServerModal />
                <HomePage />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </ClerkProvider>
  );
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <MantineProvider>
        <BrowserRouter>
          <RouterComponent />
        </BrowserRouter>
      </MantineProvider>
    </ApolloProvider>
  </StrictMode>
);

export default RouterComponent;
