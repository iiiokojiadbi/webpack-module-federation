import { Link, Outlet } from "react-router-dom";
import cls from "./App.module.scss";

import { adminRoutes } from "@packages/shared/src/routes/admin";
import { shopRoutes } from "@packages/shared/src/routes/shop";

export const App = () => {
  return (
    <div data-testid={"DataTestId.App"} className={cls.App}>
      <Link to={adminRoutes.main}>admin</Link>
      <br />
      <Link to={shopRoutes.main}>shop</Link>
      <br />
      <Link to={shopRoutes.second}>shop second</Link>

      <h1>{_PLATFORM_}</h1>
      <h1>HOST MODULE</h1>

      <Outlet />
    </div>
  );
};
