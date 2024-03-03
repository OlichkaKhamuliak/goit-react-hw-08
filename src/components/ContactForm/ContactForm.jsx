import { useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
// import { nanoid } from "nanoid";
import { IoPersonAdd } from "react-icons/io5";
import { IMaskInput } from "react-imask";
import { useDispatch, useSelector } from "react-redux";
import countries from "./countries";
import { selectContacts } from "../../redux/selectors";
import toast, { Toaster } from "react-hot-toast";
import { addContact } from "../../redux/operation";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .required("Name is a required field"),
  number: Yup.string()
    .matches(/^\+?[\d()\-\s]+$/, "Invalid phone number format")
    .required("Phone number is required"),
});

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [countryCode, setCountryCode] = useState("+38"); // Початковий код країни
  const [placeholder, setPlaceholder] = useState("+38 (000)-000-0000");

  const [countryOptions] = useState(countries);

  const handleCountryChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    const newPlaceholder = countryOptions.find(
      (option) => option.value === newCountryCode
    ).mask;
    setPlaceholder(newPlaceholder);
  };

  const nameFieldId = useId();
  const numberFieldId = useId();
  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
  };

  return (
    <div>
      <Formik
        initialValues={{
          name: "",
          number: "",
        }}
        validationSchema={userSchema}
        onSubmit={(values, { resetForm }) => {
          const newContact = {
            name: values.name,
            phone: values.number,
          };
          //Перевіряємо чи номер або ім'я контакту вже існує в книзі контактів
          const nameMatch = contacts.find(
            (contact) =>
              contact.name.toLowerCase() === values.name.toLocaleLowerCase()
          );
          const numberMatch = contacts.find(
            (contact) => contact.phone === values.number
          );

          if (nameMatch || numberMatch) {
            resetForm();
            const conflictReason =
              nameMatch && numberMatch
                ? `name '${values.name}' and phone number '${values.number}'`
                : nameMatch
                ? `name '${values.name}'`
                : `phone number '${values.number}'`;

            toast.error(
              `A contact ${conflictReason} is already exist in the address book.`
            );
            return;
          }

          handleAddContact(newContact);
          resetForm();
        }}
      >
        <Form className={css.form} autoComplete="off">
          <div className={css.formGroup}>
            <label className={css.label} htmlFor={nameFieldId}>
              Name
            </label>
            <Field
              className={css.input}
              type="text"
              name="name"
              id={nameFieldId}
              placeholder="Name Surname"
            />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>

          <div className={css.formGroup}>
            <label
              className={`${css.label} ${css.number}`}
              htmlFor={numberFieldId}
            >
              Number
            </label>
            <select
              className={css.select}
              value={countryCode}
              onChange={handleCountryChange}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Field
              as={IMaskInput}
              className={css.input}
              type="tel"
              name="number"
              id={numberFieldId}
              placeholder={
                countryCode === "another" ? "Enter number" : placeholder
              }
              mask={
                countryOptions.find((option) => option.value === countryCode)
                  .mask
              }
            />
            <ErrorMessage
              className={css.error}
              name="number"
              component="span"
            />
          </div>

          <button className={css.button} type="submit">
            <IoPersonAdd className={css.btnIcon} size="25" />
            Add user
          </button>
        </Form>
      </Formik>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerStyle={{
          top: 80,
        }}
      />
    </div>
  );
};
