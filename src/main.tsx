import React from "react";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PageLoader from "./components/PageLoader";
const KiistApp = lazy(() => import("./engine/KIIST"));
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Suspense fallback={<PageLoader />}>
      <KiistApp />
    </Suspense>
  </StrictMode>
);
