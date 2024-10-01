import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [disable, setDisable] = useState(true);
  const { startLogin } = useAuthStore();

  const loginClick = async () => {
    const data = await startLogin({ email, password });
    if (data.success) {
      Swal.fire({
        position: "center",
        icon: "success",
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      loginClick();
    }
  };

  useEffect(() => {
    if (email.length > 0 && password.length > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [email, password]);

  return (
    <div className="flex flex-col items-center justify-center h-screen m-2">
      <h1 className="font-bold text-5xl">17GRIM</h1>
      <p className="text-xl">Fitness</p>
      <div className="text-end">
        <div className="input-group-sm input-group mb-3">
          <span className="input-group-text">Correo electrónico</span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyDown={handleKeyDown}
          />
        </div>
        <div className="input-group-sm input-group mb-3">
          <span className="input-group-text">Contraseña</span>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            onKeyDown={handleKeyDown}
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
        <div className="mt-4">
          <Link
            to="/register"
            className="btn btn-sm btn-secondary ms-auto me-3"
          >
            Registro
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-success ms-auto"
            onClick={loginClick}
            disabled={disable}
          >
            Ingresar
          </button>
        </div>
      </div>
    </div>
  );
};
