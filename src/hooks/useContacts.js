import { useSelector } from "react-redux";
import {
  selectContacts,
  selectError,
  selectFilter,
  selectLoading,
  selectVisibleContacts,
} from "../redux/contacts/selectors";

export const useContacts = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilter);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const visibleContacts = useSelector(selectVisibleContacts);

  return {
    contacts,
    filter,
    loading,
    error,
    visibleContacts,
  };
};
//   const { isRefreshing } = useAuth();
