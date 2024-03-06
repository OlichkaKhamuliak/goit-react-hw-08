import { useState } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operation";
import toast from "react-hot-toast";
import css from "./EditContactModal.module.css";
import { GrUpdate } from "react-icons/gr";
import { MdOutlineCancel } from "react-icons/md";
import { customStyles } from "../../assets/constants";

Modal.setAppElement("#root");

const EditContactModal = ({ isOpen, closeModal, contact }) => {
  const { name, number, id } = contact;

  const dispatch = useDispatch();
  const [editedName, setEditedName] = useState(name);
  const [editedPhone, setEditedPhone] = useState(number);

  const handleUpdateContact = () => {
    if (editedName.trim().length < 3) {
      toast.error("Name must be at least 2 characters long.");
      return;
    }

    const phoneRegex = /^\+?[0-9()-\s]+$/;
    if (!phoneRegex.test(editedPhone.trim())) {
      toast.error(
        "Phone number can start with '+' and contain only digits, dashes, parentheses, and spaces."
      );
      return;
    }
    if (editedName.trim() === "" || editedPhone.trim() === "") {
      toast.error("Empty string");
      return;
    }

    const updatedData = {
      name: editedName,
      number: editedPhone,
    };
    dispatch(updateContact({ contactId: id, updatedData }))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully updated!");
        closeModal();
      })
      .catch(() => {
        toast.error("Something went wrong. Please try reloading the page.");
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit contact modal"
    >
      <h2 className={css.title}>Edit contact</h2>
      <div className={css.inputWrap}>
        <label htmlFor="editedName"></label>

        <input
          type="text"
          value={editedName}
          placeholder="Name Surname"
          className={css.input}
          pattern=".{2,40}"
          required
          title="Username must be between 2 and 40 characters."
          onChange={(e) => setEditedName(e.target.value)}
        />
        <label htmlFor="editedPhone"></label>

        <input
          type="tel"
          value={editedPhone}
          className={css.input}
          placeholder="Phone number"
          pattern="^\+?\d[\d()\-\s]*$"
          required
          title="Phone number can start with '+' and contain only digits, dashes, parentheses, and spaces."
          onChange={(e) => setEditedPhone(e.target.value)}
        />
      </div>
      <div className={css.btnWrap}>
        <button
          onClick={handleUpdateContact}
          className={`${css.button} ${css.update}`}
          disabled={editedName.trim() === name && editedPhone.trim() === number}
        >
          <GrUpdate className={css.icon} size="18" />
          Update
        </button>
        <button onClick={closeModal} className={`${css.button} ${css.cancel}`}>
          <MdOutlineCancel className={css.icon} size="25" />
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditContactModal;
