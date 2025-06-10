import React from "react";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PageLoader from "./components/PageLoader";
import { Provider } from "react-redux";
import store from "./redux/store";

import "@ant-design/v5-patch-for-react-19";
import Cursor from "./components/cursor";
const KiistApp = lazy(() => import("./engine/KIIST"));

createRoot(document.getElementById("root")!).render(
  <StrictMode >
   
    <Suspense fallback={<PageLoader />}>
      <Provider store={store}>
        <KiistApp />
      </Provider>
    </Suspense>
  </StrictMode>
);
