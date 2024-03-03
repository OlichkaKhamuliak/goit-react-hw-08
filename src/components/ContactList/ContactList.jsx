import { useSelector } from "react-redux";
import { Contact } from "./ContactItem";
import css from "./ContactList.module.css";
import { selectVisibleContacts } from "../../redux/selectors";

export const ContactList = () => {
  const visibleContacts = useSelector(selectVisibleContacts);
  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={css.listItem}>
          <Contact contact={contact} />
        </li>
      ))}
    </ul>
  );
};
