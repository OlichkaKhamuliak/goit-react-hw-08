import Modal from "react-modal";
import { customStyles } from "../../assets/constants";
import css from "./DeleteConfirmationModal.module.css";
import { AiOutlineDelete } from "react-icons/ai";
import { VscCircleSlash } from "react-icons/vsc";

Modal.setAppElement("#root");

const DeleteConfirmationModal = ({
  isOpen,
  onRequestClose,
  onConfirmDelete,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation Modal"
      style={customStyles}
    >
      <h2 className={css.title}>
        Are you sure you want to delete this contact?
      </h2>
      <div className={css.btnWrap}>
        <button
          onClick={onConfirmDelete}
          className={`${css.button} ${css.delete}`}
        >
          <AiOutlineDelete size="20" className={css.icon} />
          Yes
        </button>
        <button
          onClick={onRequestClose}
          className={`${css.button} ${css.cancel}`}
        >
          <VscCircleSlash size="20" className={css.icon} />
          No
        </button>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
