import clsx from "clsx";
import css from "./constans.module.css";

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "pink",
    borderColor: "black",
    width: "80%",
    maxWidth: "425px",
    padding: "10px",
  },
};

export const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};
