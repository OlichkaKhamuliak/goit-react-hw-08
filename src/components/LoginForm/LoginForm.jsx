import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { EmailPasswordInputs } from "../EmailPasswordInputs/EmailPasswordInputs";
import { AuthBtn } from "../AuthBtn/AuthBtn";
import { NavLink } from "react-router-dom";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      logIn({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Login success");
      })
      .catch(() => {
        toast.error("Incorrect email or password :c");
      });

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <EmailPasswordInputs />
      <NavLink className={css.link} to="/register">
        Don`t have an account? Register
      </NavLink>
      <AuthBtn>Log In</AuthBtn>
    </form>
  );
};
