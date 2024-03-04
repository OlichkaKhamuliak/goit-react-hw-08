import css from "./Contacts.module.css";
import { ContactForm } from "../../components/ContactForm/ContactForm";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { ContactList } from "../../components/ContactList/ContactList";
import { FaAddressBook } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectFilter,
  selectLoading,
  selectVisibleContacts,
} from "../../redux/contacts/selectors";
import { useEffect } from "react";
import { setFilter } from "../../redux/contacts/filterSlice";
import { fetchContacts } from "../../redux/contacts/operation";
import Loader from "../../components/Loader/Loader";

export default function Contacts() {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const visibleContacts = useSelector(selectVisibleContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  //Скидуємо фільтр коли масив контактів порожній
  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(setFilter(""));
    }
  }, [contacts, dispatch]);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div style={{ padding: 8 }}>
      {error && <p>{error.message}</p>}
      <h1 className={css.title}>
        <FaAddressBook className={css.icon} />
        Phone Book
      </h1>
      <ContactForm />
      {loading && <Loader />}
      {contacts.length > 0 ? (
        <SearchBox />
      ) : loading ? null : ( // Перевірка, чи завантажуються контакти
        <p className={`${css.text} ${css.noContacts}`}>
          You don`t have any contacts yet.
        </p>
      )}
      {visibleContacts.length > 0 ? (
        <ContactList />
      ) : (
        contacts.length > 0 && (
          <p className={css.text}>No matches found for `{filter}`</p>
        )
      )}
    </div>
  );
}
