import { useState } from "react";
import { useUserStore } from "../hooks/useUserStore";
import Swal from "sweetalert2";

export const UserData = ({ user }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editedUser, setEditedUser] = useState({
    name: user.name || "",
    lastName: user.lastName || "",
    dni: user.dni || "",
    cel: user.cel || "",
  });

  const { startPutUserData } = useUserStore();

  const putUserData = async () => {
    try {
      const userData = { ...editedUser };
      if (password) {
        userData.password = password;
      }
      const data = await startPutUserData(userData);
      if (data.success) {
        setEdit(false);
        setPassword("");
        Swal.fire({
          position: "center",
          icon: "success",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Hubo un error al registrar el usuario.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  return (
    <div className="mx-2">
      <div className="container border border-black p-2 rounded">
        <p className="text-center font-semibold text-xl mb-2">Datos</p>
        <div className={`row ${edit ? "blur-none" : "blur-sm"}`}>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Fecha de inicio</span>
              <input
                type="date"
                name="name"
                className="form-control"
                value={editedUser.startDate}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Nombre</span>
              <input
                type="text"
                name="name"
                className="form-control"
                disabled={!edit}
                value={editedUser.name}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Apellido</span>
              <input
                type="text"
                name="lastName"
                className="form-control"
                disabled={!edit}
                value={editedUser.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">DNI</span>
              <input
                type="number"
                name="dni"
                className="form-control"
                disabled={!edit}
                value={editedUser.dni}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Celular</span>
              <input
                type="number"
                name="cel"
                className="form-control"
                disabled={!edit}
                value={editedUser.cel}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6 mb-2">
            <div className="input-group input-group-sm">
              <span className="input-group-text">Nueva contraseña</span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                disabled={!edit}
              />
              <button
                className="btn btn-sm btn-light"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="ri-eye-off-fill" title="Ocultar"></i>
                ) : (
                  <i className="ri-eye-fill" title="Ver"></i>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6 flex flex-wrap justify-center items-center">
          {edit ? (
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                className="btn btn-danger btn-sm text-xs"
                onClick={() => setEdit(false)}
              >
                Cancelar
              </button>
              <button
                className="btn btn-success btn-sm text-xs"
                onClick={putUserData}
              >
                Guardar
              </button>
            </div>
          ) : (
            <button
              className="btn btn-dark btn-sm text-xs"
              onClick={() => setEdit(true)}
            >
              Editar datos
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
