import ContactItem from "./ContactItem";
import css from "./ContactList.module.css";
import { useContacts } from "../../hooks/useContacts";

export default function ContactList() {
  const { visibleContacts } = useContacts();
  return (
    <ul className={css.list}>
      {visibleContacts.map((contact) => (
        <li key={contact.id} className={css.listItem}>
          <ContactItem contact={contact} />
        </li>
      ))}
    </ul>
  );
}
