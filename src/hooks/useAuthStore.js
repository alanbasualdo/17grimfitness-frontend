import gymApi from "../api/gymApi";
import { useDispatch, useSelector } from "react-redux";
import { setChecking, setLogin, setLogout } from "../store/authSlice";

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
    dispatch(setChecking());
    try {
      const { data } = await gymApi.post("/user", user);
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("token-init-date", new Date().getTime());
        /* toast.success(data.msg); */
        dispatch(setLogin(data));
      } else {
        /* toast.error(data.msg); */
        dispatch(setLogout());
      }
    } catch (error) {
      console.log(error);
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
