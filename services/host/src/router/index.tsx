import { createBrowserRouter } from "react-router-dom";

import { App } from "@/components/App";

// @ts-ignore
import shopRouter from "shop/Router";
// @ts-ignore
import adminRouter from "admin/Router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [...adminRouter, ...shopRouter],
  },
]);
