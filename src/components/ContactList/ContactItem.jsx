import { useState } from "react";
import css from "./ContactList.module.css";
import { IoPersonRemove } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operation";
import { MdModeEditOutline } from "react-icons/md";

import DeleteConfirmationModal from "../deleteContactModal/deleteContactModal";
import toast from "react-hot-toast";
import EditContactModal from "../EditContModal/EditContModal";

export const Contact = ({ contact }) => {
  const { name, number, id } = contact;
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
    setShowDeleteModal(false);
    toast.success("Contact successfully deleted!");
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
          {number}
        </p>
      </div>
      <div className={css.btnWrap}>
        <button className={`${css.btn} ${css.edit}`} onClick={openEditModal}>
          <MdModeEditOutline className={css.icon} size="20" />
          Edit
        </button>
        <button className={css.btn} onClick={() => setShowDeleteModal(true)}>
          <IoPersonRemove className={css.icon} size="20" />
          Delete
        </button>
      </div>
      <EditContactModal
        isOpen={isEditing}
        closeModal={closeEditModal}
        contact={contact}
      />
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        onConfirmDelete={() => handleDelete(id)}
      />
    </div>
  );
};
