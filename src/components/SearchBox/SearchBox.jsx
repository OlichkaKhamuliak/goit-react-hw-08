import { useDispatch } from "react-redux";
import css from "./SearchBox.module.css";
import { setFilter } from "../../redux/contacts/filterSlice";
import { useContacts } from "../../hooks/useContacts";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const { filter } = useContacts();
  return (
    <div className={css.wrapper}>
      <p>Finds contacts by name or phone number</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
      />
    </div>
  );
};
