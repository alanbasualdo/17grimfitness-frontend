import gymApi from "../api/gymApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setChecking,
  setLoadingUser,
  setLogin,
  setLogout,
} from "../store/authSlice";
import Swal from "sweetalert2";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({ dni, password }) => {
    dispatch(setChecking());
    try {
      const { data } = await gymApi.post("/login", { dni, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        /* toast.success(data.msg); */
        dispatch(setLogin(data));
        return;
      } else {
        /* toast.error(data.msg); */
        dispatch(setLogout());
        return;
      }
    } catch (error) {
      /* toast.error(error.response.data.msg); */
      dispatch(setLogout());
      return;
    }
  };

  const startRegister = async (user) => {
    dispatch(setLoadingUser(true));
    try {
      const { data } = await gymApi.post("/user/new", user);
      dispatch(setLoadingUser(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUser(false));
      console.log(error);
      return { success: false, message: "Error al registrar el usuario" };
    }
  };

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return; /* dispatch(setLogout()) */
    try {
      const { data } = await gymApi.get("/login/renew");
      localStorage.setItem("token", data.token);
      localStorage.setItem("token-init-date", new Date().getTime());
      dispatch(setLogin(data));
    } catch (error) {
      localStorage.clear();
      /*   dispatch(setLogout()) */
    }
  };

  return {
    status,
    user,
    errorMessage,
    startLogin,
    startRegister,
    checkAuth,
  };
};
