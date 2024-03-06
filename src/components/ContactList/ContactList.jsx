import { Contact } from "./ContactItem";
import css from "./ContactList.module.css";
import { useContacts } from "../../hooks/useContacts";

export const ContactList = () => {
  const { visibleContacts } = useContacts();
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
