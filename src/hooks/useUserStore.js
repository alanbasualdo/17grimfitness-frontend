import gymApi from "../api/gymApi";
import { useDispatch } from "react-redux";
import { setLoadingUser } from "../store/authSlice";
import { setLoadingUsers, setUsers } from "../store/usersSlice";

export const useUserStore = () => {
  const dispatch = useDispatch();

  const startPutUserData = async (user) => {
    dispatch(setLoadingUser(true));
    try {
      const { data } = await gymApi.put("/user/edit", user);
      dispatch(setLoadingUser(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUser(false));
      console.log(error);
      return { success: false, message: "Error al registrar el usuario" };
    }
  };

  const startPutUserDataByAdmin = async (user) => {
    dispatch(setLoadingUser(true));
    try {
      const { data } = await gymApi.put(`/users/put/${user._id}`, user);
      dispatch(setLoadingUsers(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUser(false));
      console.log(error);
      return { success: false, message: "Error al registrar el usuario" };
    }
  };

  const startGetUsers = async () => {
    dispatch(setLoadingUsers(true));
    try {
      const { data } = await gymApi.get("/users/get");
      dispatch(setUsers(data.users));
      dispatch(setLoadingUsers(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUsers(false));
      console.log(error);
      return { success: false, message: "Error al registrar el usuario" };
    }
  };

  return {
    startPutUserData,
    startGetUsers,
    startPutUserDataByAdmin,
  };
};
