import { useState } from "react";
import css from "./ContactList.module.css";
import { IoPersonRemove } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/operation";
import { MdModeEditOutline } from "react-icons/md";
import EditContactModal from "../contactModal/contactModal";

export const Contact = ({ contact }) => {
  const { name, phone, id } = contact;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  return (
    <div className={css.wrap}>
      <div className={css.itemContent}>
        <p className={css.text}>
          <IoPerson className={css.icon} />
          {name}
        </p>
        <p className={css.text}>
          <FaPhone className={css.icon} />
          {phone}
        </p>
      </div>
      <div className={css.btnWrap}>
        <button className={`${css.btn} ${css.edit}`} onClick={openEditModal}>
          <MdModeEditOutline className={css.icon} size="25" />
          Edit
        </button>
        <button className={css.btn} onClick={() => dispatch(deleteContact(id))}>
          <IoPersonRemove className={css.icon} size="25" />
          Delete
        </button>
      </div>
      <EditContactModal
        isOpen={isEditing}
        closeModal={closeEditModal}
        contact={contact}
      />
    </div>
  );
};
