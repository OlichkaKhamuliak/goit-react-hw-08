import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./ContactForm.module.css";
import { IoPersonAdd } from "react-icons/io5";
import { IMaskInput } from "react-imask";
import toast from "react-hot-toast";
import { useContacts } from "../../hooks/useContacts";
import { useContactForm } from "../../hooks/useContactForm";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters long")
    .required("Name is a required field"),
  number: Yup.string()
    .matches(/^\+?[\d()\-\s]+$/, "Invalid phone number format")
    .min(2, "Number must be at least 2 character long")
    .required("Phone number is required"),
});

export default function ContactForm() {
  const { contacts } = useContacts();
  const nameFieldId = useId();
  const numberFieldId = useId();

  const {
    countryCode,
    placeholder,
    handleCountryChange,
    handleAddContact,
    countryOptions,
  } = useContactForm();

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
            number: values.number,
          };
          //Перевіряємо чи номер або ім'я контакту вже існує в книзі контактів
          const nameMatch = contacts.find(
            (contact) =>
              contact.name.toLowerCase() === values.name.toLocaleLowerCase()
          );
          const numberMatch = contacts.find(
            (contact) => contact.number === values.number
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
            <Field
              as="select"
              className={css.select}
              value={countryCode}
              onChange={handleCountryChange}
            >
              {countryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Field>
            <Field
              as={IMaskInput}
              className={css.input}
              type="tel"
              name="number"
              id={numberFieldId}
              placeholder={placeholder}
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
            <IoPersonAdd className={css.btnIcon} size="20" />
            Add user
          </button>
        </Form>
      </Formik>
    </div>
  );
}
