import css from "./ContactList.module.css";
import { IoPersonRemove } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import { MdModeEditOutline } from "react-icons/md";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditContactModal from "../EditContactModal/EditContactModal";
import { useContactItem } from "../../hooks/useContactItem";

export default function ContactItem({ contact }) {
  const { name, number, id } = contact;
  const {
    isEditing,
    showDeleteModal,
    openEditModal,
    closeEditModal,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  } = useContactItem();

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
        <button className={css.btn} onClick={openDeleteModal}>
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
        onRequestClose={closeDeleteModal}
        onConfirmDelete={() => handleDelete(id)}
      />
    </div>
  );
}
