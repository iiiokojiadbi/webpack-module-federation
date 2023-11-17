import { createBrowserRouter } from "react-router-dom";

import { App } from "@/components/App";
import { Shop } from "@/pages/shop";
import { Suspense } from "react";
import { shopRoutes } from "@packages/shared/src/routes/shop";

const routes = [
  {
    path: shopRoutes.main,
    element: <App />,
    children: [
      {
        path: shopRoutes.main,
        element: (
          <Suspense fallback={"Loading..."}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: shopRoutes.second,
        element: (
          <Suspense fallback={"Loading..."}>
            <div style={{ background: "gray" }}>SECOND</div>
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default routes;
