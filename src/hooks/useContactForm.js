import { useState } from "react";
import { addContact } from "../redux/contacts/operation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import countries from "../components/ContactForm/countries.json";

export const useContactForm = () => {
  const dispatch = useDispatch();

  const [countryCode, setCountryCode] = useState("+38"); // Початковий код країни
  const [placeholder, setPlaceholder] = useState("0671234567");

  const [countryOptions] = useState(countries);

  const handleCountryChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    const newPlaceholder = countryOptions.find(
      (option) => option.value === newCountryCode
    ).placeholder;
    setPlaceholder(newPlaceholder);
  };
  const handleAddContact = (newContact) => {
    dispatch(addContact(newContact));
    toast.success("Contact successfully added!");
  };
  return {
    countryCode,
    placeholder,
    handleCountryChange,
    handleAddContact,
    countryOptions,
  };
};
