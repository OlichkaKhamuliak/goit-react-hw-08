import { useDispatch, useSelector } from "react-redux";
import css from "./SearchBox.module.css";
import { selectFilter } from "../../redux/contacts/selectors";
import { setFilter } from "../../redux/contacts/filterSlice";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
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
