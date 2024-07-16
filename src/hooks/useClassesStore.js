import gymApi from "../api/gymApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../store/loaderSlice";
import { setClasses } from "../store/classSlice";
import Swal from "sweetalert2";

export const useClassStore = () => {
  const dispatch = useDispatch();
  const { classes } = useSelector((state) => state.class);

  const startPostClass = async (newClass) => {
    dispatch(setLoading(true));
    try {
      const { data } = await gymApi.post("/class/post", newClass);
      dispatch(setLoading(false));
      if (data.success) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } catch (error) {
      dispatch(setLoading(false));
      Swal.fire({
        position: "center",
        icon: "success",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  };

  const startGetClasses = async () => {
    dispatch(setLoading(true));
    try {
      const { data } = await gymApi.get("/class/get");
      dispatch(setLoading(false));
      if (data.success) {
        dispatch(setClasses(data.allClasses));
        return;
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.msg,
          showConfirmButton: false,
          timer: 1500,
        });
        return;
      }
    } catch (error) {
      dispatch(setLoading(false));
      Swal.fire({
        position: "center",
        icon: "success",
        title: error.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
  };

  return {
    startPostClass,
    startGetClasses,
  };
};
