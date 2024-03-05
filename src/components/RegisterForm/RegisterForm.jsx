import { useDispatch } from "react-redux";
import css from "./RegisterForm.module.css";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { EmailPasswordInputs } from "../EmailPasswordInputs/EmailPasswordInputs";
import { AuthBtn } from "../AuthBtn/AuthBtn";
import { NavLink } from "react-router-dom";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Registration success");
      })
      .catch(() => {
        toast.error("Registration error: Something went wrong");
      });

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit} autoComplete="off">
      <label className={css.label}>
        Username
        <input
          type="text"
          name="name"
          required
          pattern=".{2,40}"
          title="Username must be between 2 and 30 characters"
          className={css.input}
        />
      </label>
      <EmailPasswordInputs />
      <NavLink className={css.link} to="/login">
        Already have an account? Log in
      </NavLink>
      <AuthBtn>Register</AuthBtn>
    </form>
  );
};
