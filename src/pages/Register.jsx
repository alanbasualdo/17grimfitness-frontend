import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export const Register = () => {
  const [disable, setDisable] = useState(true);
  const { startRegister } = useAuthStore();
  const [repeatedEmail, setRepeatedEmail] = useState("");
  const { loadingUser } = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    lastName: "",
    email: "",
  });

  const registerClick = async () => {
    setUser({ name: "", lastName: "", email: "" });
    setRepeatedEmail("");
    try {
      const data = await startRegister(user);
      if (data.success) {
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

  useEffect(() => {
    const areEmailsEqual = user.email === repeatedEmail;
    setDisable(!areEmailsEqual);
  }, [user, repeatedEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-2">
      <h1 className="font-bold text-5xl">17GRIM</h1>
      <p className="text-xl">Fitness</p>
      {loadingUser && (
        <div className="spinner-border spinner-border-sm mb-3" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      )}
      <div className="text-end">
        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Nombre</span>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleInputChange}
            value={user.name}
          />
          <span className="input-group-text">Apellido</span>
          <input
            type="text"
            name="lastName"
            className="form-control"
            onChange={handleInputChange}
            value={user.lastName}
          />
        </div>

        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Correo electrónico</span>
          <input
            type="text"
            name="email"
            className="form-control"
            onChange={handleInputChange}
            value={user.email}
          />
        </div>

        <div className="input-group-sm input-group mb-2">
          <span className="input-group-text">Repetir correo electrónico</span>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setRepeatedEmail(e.target.value)}
            value={repeatedEmail}
          />
        </div>

        {user.email && repeatedEmail && user.email !== repeatedEmail && (
          <div className="text-center">
            <div className="alert alert-warning" role="alert">
              Los correos deben coincidir.
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
            onClick={registerClick}
            disabled={disable || loadingUser}
          >
            Listo
          </button>
        </div>
      </div>
    </div>
  );
};
