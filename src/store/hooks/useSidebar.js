import { useDispatch, useSelector } from "react-redux";
import {
  fetchSidebarItems,
  resetSidebar,
} from "../slice/sidebarSlice";

export const useSidebar = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.sidebar);

  const getSidebarItems = async () => {
    await dispatch(fetchSidebarItems()).unwrap();
  };

  const clearSidebar = () => {
    dispatch(resetSidebar()).unwrap();
  };

  return {
    items,
    loading,
    error,
    getSidebarItems,
    clearSidebar,
  };
};
