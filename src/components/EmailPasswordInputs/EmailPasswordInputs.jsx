import { useState } from "react";
import { IoIosEye } from "react-icons/io";
import { IoEyeOffSharp } from "react-icons/io5";
import css from "./EmailPasswordInputs.module.css";
export const EmailPasswordInputs = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <label className={css.label}>
        Email
        <input
          type="email"
          name="email"
          placeholder="example@mailbox.com"
          required
          autoComplete="email"
          pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
          title="Please enter a valid email address"
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Password
        <div className={css.passwordWrap}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="password"
            required
            className={css.input}
            pattern=".{6,}"
            title="Password must be at least 6 characters long"
          />
          <div className={css.showPasswordBtnContainer}>
            <button
              type="button"
              className={css.showPasswordBtn}
              onClick={handleTogglePassword}
            >
              {showPassword ? <IoEyeOffSharp /> : <IoIosEye />}
            </button>
          </div>
        </div>
      </label>
    </div>
  );
};
