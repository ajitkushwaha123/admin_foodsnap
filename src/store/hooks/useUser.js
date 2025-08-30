"use client";

import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  logoutUser,
  loadUser,
  clearError,
  resetUser,
  registerUser,
  fetchAllUsers,
} from "../slice/userSlice";

export const useUser = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, error, users } = useSelector(
    (state) => state.user
  );

  const register = (userData) => dispatch(registerUser(userData)).unwrap();
  const login = (credentials) => dispatch(loginUser(credentials)).unwrap();
  const logout = () => dispatch(logoutUser()).unwrap();
  const fetchUser = () => dispatch(loadUser()).unwrap();
  const clearUserError = () => dispatch(clearError()).unwrap();
  const reset = () => dispatch(resetUser()).unwrap();
  const getAllUser = () => dispatch(fetchAllUsers()).unwrap();

  return {
    user,
    loading,
    isAuthenticated,
    error,
    register,
    login,
    logout,
    fetchUser,
    clearUserError,
    reset,
    getAllUser,
    users,
  };
};
