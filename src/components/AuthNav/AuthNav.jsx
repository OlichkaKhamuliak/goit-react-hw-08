import { NavLink } from "react-router-dom";
import { buildLinkClass } from "../../assets/constants";
import css from "./AuthNav.module.css";

export const AuthNav = () => {
  return (
    <div className={css.wrap}>
      <NavLink className={buildLinkClass} to="/register">
        Register
      </NavLink>
      <NavLink className={buildLinkClass} to="/login">
        Log In
      </NavLink>
    </div>
  );
};
