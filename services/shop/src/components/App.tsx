import { Link, Outlet } from "react-router-dom";
import cls from "./App.module.scss";

export const App = () => {
  return (
    <div data-testid={"DataTestId.App"} className={cls.App}>
      <h1>SHOP MODULE</h1>

      <Outlet />
    </div>
  );
};
