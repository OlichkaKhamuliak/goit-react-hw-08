import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;

export const selectFilter = (state) => state.filters.name;

export const selectLoading = (state) => state.contacts.loading;

export const selectError = (state) => state.contacts.error;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    // Функція для видалення всіх нецифрових символів з рядка
    const removeNonNumeric = (str) => str.replace(/\D/g, "");

    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        //можемо шукати номер і у форматі iMask і просто набором цифер
        removeNonNumeric(contact.number).includes(removeNonNumeric(filter))
    );
  }
);
