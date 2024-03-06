import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteContact } from "../redux/contacts/operation";
import toast from "react-hot-toast";

export const useContactItem = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openEditModal = () => {
    setIsEditing(true);
  };
  const closeEditModal = () => {
    setIsEditing(false);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        toast.success("Contact successfully deleted!");
        setShowDeleteModal(false);
      })
      .catch(() => {
        toast.error("Something went wrong. Please try reloading the page.");
      });
  };
  return {
    isEditing,
    showDeleteModal,
    openEditModal,
    closeEditModal,
    handleDelete,
    openDeleteModal,
    closeDeleteModal,
  };
};
