import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Link } from "react-router-dom";

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(true);
  const { startRegister } = useAuthStore();

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    dni: "",
    cel: "",
    password: "",
    confPassword: "",
  });

  const registerClick = () => {
    startRegister(user);
  };

  useEffect(() => {
    const isValidDni = user.dni.length === 8;
    const isValidCel = user.cel.length > 6;
    const arePasswordsEqual = user.password === user.confPassword;
    const isNameNotEmpty = user.name.trim() !== "";
    const isLastNameNotEmpty = user.lastName.trim() !== "";

    if (
      isValidDni &&
      isValidCel &&
      arePasswordsEqual &&
      isNameNotEmpty &&
      isLastNameNotEmpty
    ) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [
    user.dni,
    user.cel,
    user.password,
    user.confPassword,
    user.name,
    user.lastName,
  ]);

  return (
    <div className="flex flex-col items-center justify-center h-screen m-2">
      <h1 className="font-bold text-5xl">17GRIM</h1>
      <p className="text-xl">Fitness</p>
      <div className="text-end">
        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Nombre</span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            value={user.name}
          />
          <span className="input-group-text">Apellido</span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            value={user.lastName}
          />
        </div>

        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">DNI</span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setUser({ ...user, dni: e.target.value })}
            value={user.dni}
          />
          <span className="input-group-text">Celular</span>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setUser({ ...user, cel: e.target.value })}
            value={user.cel}
          />
        </div>

        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Contraseña</span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
          <button
            className="btn btn-sm btn-outline-secondary"
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

        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Repetir contraseña</span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            onChange={(e) => setUser({ ...user, confPassword: e.target.value })}
            value={user.confPassword}
          />
          <button
            className="btn btn-sm btn-outline-secondary"
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

        {user.password &&
          user.confPassword &&
          user.password !== user.confPassword && (
            <div className="text-center">
              <div className="alert alert-warning" role="alert">
                Las contraseñas deben coincidir.
              </div>
            </div>
          )}

        <div className="mt-4">
          <Link to="/login" className="btn btn-sm btn-secondary ms-auto me-3">
            Volver
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-success ms-auto"
            onClick={(e) => registerClick(e)}
            disabled={disable}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
