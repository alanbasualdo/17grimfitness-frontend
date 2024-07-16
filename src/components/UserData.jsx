import React from "react";

export const UserData = ({ user }) => {
  return (
    <>
      <div className="container border p-2 rounded">
        <p className="text-center font-semibold mt-2 text-xl">
          Datos personales
        </p>
        <div className="row">
          <div className="col-md-6">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">Nombre</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.name}
                readOnly
              />
              <span className="input-group-text">Apellido</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.lastName}
                readOnly
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">DNI</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.dni}
                readOnly
              />
              <span className="input-group-text">Celular</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.cel}
                readOnly
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">Ciudad</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.city}
                readOnly
              />
            </div>
          </div>

          <div className="col-md-6">
            <div className="input-group input-group-sm mb-2">
              <span className="input-group-text">Dirección</span>
              <input
                type="text"
                className="form-control"
                disabled
                value={user.address}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <button className="btn btn-outline-primary btn-sm">Editar</button>
        </div>
      </div>
    </>
  );
};
