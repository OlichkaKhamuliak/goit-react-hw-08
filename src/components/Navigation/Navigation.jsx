import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import css from "./Navigation.module.css";
import { buildLinkClass } from "../../assets/constants";

export const Navigation = () => {
  const { isLoggedIn } = useAuth();

  return (
    <nav className={css.nav}>
      <NavLink className={buildLinkClass} to="/">
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={buildLinkClass} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
};
