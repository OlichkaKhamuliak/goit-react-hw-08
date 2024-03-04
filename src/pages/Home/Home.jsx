import { NavLink } from "react-router-dom";
import DocumentTitle from "../../components/DocumentTitle/DocumentTitle";
import { useAuth } from "../../hooks/useAuth";
import css from "./Home.module.css";

const styles = {
  container: {
    minHeight: "calc(100vh - 50px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: 500,
    fontSize: 48,
    textAlign: "center",
  },
};

export default function Home() {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      <DocumentTitle>Home</DocumentTitle>

      <div style={styles.container}>
        <h1 style={styles.title}>
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
                  This is your "Phone Book".
                  <NavLink
                    className={`${css.link} ${css.login}`}
                    to="/contacts"
                  >
                    <br />
                    View contacts
                  </NavLink>
                </span>
              </p>
            </>
          ) : (
            <>
              <p className={css.text}>
                <span>
                  Hello! This is your "Phone Book". If you already have an
                  account, please
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
