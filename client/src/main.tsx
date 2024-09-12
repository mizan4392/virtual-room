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
    <MantineProvider>
      <BrowserRouter>
        <RouterComponent />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>
);

export default RouterComponent;
