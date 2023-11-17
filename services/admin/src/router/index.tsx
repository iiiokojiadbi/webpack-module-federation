import { createBrowserRouter } from "react-router-dom";

import { App } from "@/components/App";
import { Admin } from "@/pages/admin";
import { Suspense } from "react";
import { adminRoutes } from "@packages/shared/src/routes/admin";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: adminRoutes.main,
        element: (
          <Suspense fallback={"Loading..."}>
            <Admin />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
