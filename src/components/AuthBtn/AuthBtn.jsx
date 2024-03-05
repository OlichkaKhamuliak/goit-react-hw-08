import css from "./AuthBtn.module.css";

export const AuthBtn = ({ children }) => {
  return (
    <button className={css.button} type="submit">
      {children}
    </button>
  );
};
