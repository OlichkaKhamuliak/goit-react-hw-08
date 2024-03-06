import { NavLink } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { useAuth } from "../../hooks/useAuth";
import css from "./Home.module.css";
import svg from "./phone-book.svg";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div className={css.container}>
        <h1 className={css.title}>
          {user.name ? (
            <>
              <p className={css.text}>
                <span>
                  Welcome, {user.name}
                  <span
                    className={css.emoji}
                    role="img"
                    aria-label="Greeting icon"
                  >
                    👋.
                  </span>
                  This is your «Phone Book».
                  <NavLink
                    className={`${css.link} ${css.login}`}
                    to="/contacts"
                  >
                    <br />
                    View contacts
                  </NavLink>
                </span>
              </p>
              <img
                src={svg}
                alt="Phone book svg"
                width="450"
                className={css.svg}
              />
            </>
          ) : (
            <>
              <p className={css.text}>
                <span>
                  Hello!
                  <span
                    className={css.emoji}
                    role="img"
                    aria-label="Greeting icon"
                  >
                    👋
                  </span>
                  <br /> Welcome to «Phone Book», your personal contact
                  organizer.
                  <br />
                  If you already have an account, please
                  <NavLink className={`${css.link} ${css.login}`} to="/login">
                    log in
                  </NavLink>
                  . If not, please
                  <NavLink className={css.link} to="/register">
                    register
                  </NavLink>
                  to start using it.
                </span>
              </p>
            </>
          )}
        </h1>
      </div>
    </>
  );
}
