import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../slice/eventSlice";

export const useEvents = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  const getEvents = async () => {
    await dispatch(fetchEvents()).unwrap();
  };

  const resetEvents = () => {
    dispatch(resetEvents()).unwrap();
  };

  return {
    events,
    loading,
    error,
    getEvents,
    resetEvents,
  };
};
