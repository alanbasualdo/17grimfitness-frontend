import gymApi from "../api/gymApi";
import { useDispatch } from "react-redux";
import { setLoadingUserClasses, setUserClasses } from "../store/userClasses";

export const useUserClass = () => {
  const dispatch = useDispatch();

  // Inscribir usuario a una clase
  const startSubscribeClass = async (classId) => {
    dispatch(setLoadingUserClasses(true));
    try {
      const { data } = await gymApi.post("/userClass/subscribe", { classId });
      dispatch(setLoadingUserClasses(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUserClasses(false));
      console.error("Error al registrar el usuario:", error);
      return { success: false, message: "Error al registrar el usuario" };
    }
  };

  // Obtener todas las clases
  const getAllClasses = async () => {
    dispatch(setLoadingUserClasses(true));
    try {
      const { data } = await gymApi.get("/userClass/");
      dispatch(setLoadingUserClasses(false));
      dispatch(setUserClasses(data.allClasses));
      return data;
    } catch (error) {
      dispatch(setLoadingUserClasses(false));
      console.error("Error al obtener las clases:", error);
      return { success: false, message: "Error al obtener las clases" };
    }
  };

  // Obtener usuarios inscritos en una clase específica
  const getInscribedUsersByClass = async (classId) => {
    dispatch(setLoadingUserClasses(true));
    try {
      const { data } = await gymApi.get(`/userClass/${classId}/inscribed`);
      dispatch(setLoadingUserClasses(false));
      dispatch(setUserClasses(data.inscribedUsers));
      return data;
    } catch (error) {
      dispatch(setLoadingUserClasses(false));
      console.error("Error al obtener los usuarios inscritos:", error);
      return {
        success: false,
        message: "Error al obtener los usuarios inscritos",
      };
    }
  };

  // Obtener todas las clases de un usuario
  const getAllClassesByUser = async () => {
    dispatch(setLoadingUserClasses(true));
    try {
      const { data } = await gymApi.get("/userClass/classes");
      dispatch(setLoadingUserClasses(false));
      dispatch(setUserClasses(data.userClasses));
      return data;
    } catch (error) {
      dispatch(setLoadingUserClasses(false));
      console.error("Error al obtener las clases del usuario:", error);
      return {
        success: false,
        message: "Error al obtener las clases del usuario",
      };
    }
  };

  // Desinscribir usuario de una clase
  const startUnsubscribeClass = async (classId) => {
    dispatch(setLoadingUserClasses(true));
    try {
      const { data } = await gymApi.delete(`/userClass/unsubscribe/${classId}`);
      dispatch(setLoadingUserClasses(false));
      return data;
    } catch (error) {
      dispatch(setLoadingUserClasses(false));
      console.error("Error al desinscribir al usuario:", error);
      return { success: false, message: "Error al desinscribir al usuario" };
    }
  };

  return {
    startSubscribeClass,
    getAllClasses,
    getInscribedUsersByClass,
    getAllClassesByUser,
    startUnsubscribeClass,
  };
};
