import gymApi from "../api/gymApi";
import { useDispatch } from "react-redux";
import { setLoadingUser } from "../store/authSlice";

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

  return {
    startPutUserData,
  };
};
