import { useSelector } from "react-redux";
import { useUserStore } from "../hooks/useUserStore";
import { useEffect, useState } from "react";
import moment from "moment";

export const Admin = () => {
  const { startGetUsers, startPutUserDataByAdmin } = useUserStore();
  const { users, loadingUsers } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  const updateUser = async () => {
    const data = await startPutUserDataByAdmin(formData);
    console.log(data);
    setSelectedUser(null);
    setIsEditable(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate") {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleEditClick = (user) => {
    const formattedUser = {
      ...user,
      startDate: moment.utc(user.startDate).format("YYYY-MM-DD"),
    };
    setSelectedUser(user);
    setFormData(formattedUser);
    setIsEditable(true);
  };

  useEffect(() => {
    startGetUsers();
  }, []);

  return (
    <div className="h-screen flex flex-col items-center mx-2 mt-2">
      {loadingUsers ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <>
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-dark rounded text-light px-3 py-2"
            >
              {isEditable && selectedUser.id === user.id ? (
                <>
                  <h1 className="text-xl text-center">Editar datos</h1>
                  <div className="flex flex-col gap-2 justify-center items-center mb-2">
                    {/* Nombre */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon1">
                        Nombre
                      </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                    {/* Apellido */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon2">
                        Apellido
                      </span>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon2"
                      />
                    </div>
                    {/* Email */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon3">
                        Email
                      </span>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon3"
                      />
                    </div>
                    {/* DNI */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon4">
                        DNI
                      </span>
                      <input
                        type="text"
                        name="dni"
                        value={formData.dni}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon4"
                      />
                    </div>
                    {/* Celular */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon5">
                        Celular
                      </span>
                      <input
                        type="text"
                        name="cel"
                        value={formData.cel}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon5"
                      />
                    </div>
                    {/* Ciudad */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon6">
                        Ciudad
                      </span>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon6"
                      />
                    </div>
                    {/* Dirección */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon7">
                        Dirección
                      </span>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon7"
                      />
                    </div>
                    {/* Fecha de inicio */}
                    <div className="input-group">
                      <span className="input-group-text" id="basic-addon8">
                        Fecha de inicio
                      </span>
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="form-control"
                        aria-describedby="basic-addon8"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center items-center">
                    <button
                      onClick={() => setIsEditable(false)}
                      className="btn btn-secondary mt-2 btn-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={updateUser}
                      className="btn btn-primary mt-2 btn-sm"
                    >
                      Guardar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Nombre:</b>
                    {user.name}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Apellido:</b>
                    {user.lastName}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Email:</b>
                    {user.email}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">DNI:</b>
                    {user.dni}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Celular:</b>
                    {user.cel}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Ciudad:</b>
                    {user.city}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Dirección:</b>
                    {user.address}
                  </p>
                  <p className="flex flex-wrap items-center gap-2">
                    <b className="text-sm">Fecha de inicio:</b>
                    {moment.utc(user.startDate).format("DD/MM/YYYY")}
                  </p>
                  <p
                    className={`flex flex-wrap items-center gap-2 ${
                      user.state ? "text-success" : "text-danger"
                    }`}
                  >
                    <b className="text-sm">Estado:</b>
                    {user.state ? "Alta" : "Baja"}
                  </p>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="btn btn-warning mb-1 btn-sm"
                  >
                    Editar
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
