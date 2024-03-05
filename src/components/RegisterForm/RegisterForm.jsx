import { useDispatch } from "react-redux";
import css from "./RegisterForm.module.css";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { EmailPasswordInputs } from "../EmailPasswordInputs/EmailPasswordInputs";

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
        console.log();
        ("Registration success");
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
        <input type="text" name="name" />
      </label>
      <EmailPasswordInputs />
      <button type="submit">Register</button>
    </form>
  );
};
