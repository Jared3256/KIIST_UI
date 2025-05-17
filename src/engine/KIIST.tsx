import { RouterProvider } from "react-router";
import system_routes from "../routes/router";

export default function KiistApp() {
  return <RouterProvider router={system_routes} />;
}
