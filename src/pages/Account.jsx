import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { useClassStore } from "../hooks/useClassesStore";

export const Account = () => {
  const { user } = useAuthStore();
  const { startPostClass } = useClassStore();
  const [addClass, setAddClass] = useState(false);
  const [newClass, setNewClass] = useState({
    day: "",
    from: "",
    to: "",
    about: "",
  });

  const addNewClass = async () => {
    await startPostClass(newClass);
  };

  useEffect(() => {
    if (!addClass) {
      setNewClass({
        day: "",
        from: "",
        to: "",
        about: "",
      });
    }
  }, [addClass]);

  return (
    <div className="text-center">
      {user.role === "AdminRole" && (
        <div className="mb-4 mx-2">
          <button
            className={`btn btn-sm mb-2 ${
              addClass ? "btn-danger" : "btn-primary"
            }`}
            onClick={() => setAddClass(!addClass)}
          >
            {addClass ? "Cancelar" : "Agregar clase"}
          </button>
          {addClass && (
            <div className=" p-2 border rounded-lg bg-gray-50">
              <div className="input-group input-group-sm mb-2">
                <span className="input-group-text">Día</span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Selecciona un día"
                  onChange={(e) =>
                    setNewClass({ ...newClass, day: e.target.value })
                  }
                >
                  <option disabled>Selecciona un día</option>
                  <option value="Lunes">Lunes</option>
                  <option value="Martes">Martes</option>
                  <option value="Miércoles">Miércoles</option>
                  <option value="Jueves">Jueves</option>
                  <option value="Viernes">Viernes</option>
                </select>
              </div>
              <div className="input-group input-group-sm mb-2">
                <span className="input-group-text">Horario</span>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Desde"
                  onChange={(e) =>
                    setNewClass({ ...newClass, from: e.target.value })
                  }
                  disabled={!newClass.day}
                >
                  <option disabled>Desde</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                </select>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue="Hasta"
                  onChange={(e) =>
                    setNewClass({ ...newClass, to: e.target.value })
                  }
                  disabled={!newClass.from}
                >
                  <option disabled>Hasta</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                  <option value="19:00">19:00</option>
                  <option value="20:00">20:00</option>
                  <option value="21:00">21:00</option>
                  <option value="22:00">22:00</option>
                </select>
              </div>
              <div className="input-group input-group-sm mb-2">
                <span className="input-group-text">Clase de</span>
                <input
                  type="text"
                  className="form-control"
                  value={newClass.about}
                  onChange={(e) =>
                    setNewClass({ ...newClass, about: e.target.value })
                  }
                  disabled={!newClass.to}
                />
              </div>
              <button
                className="btn btn-sm btn-success"
                disabled={!newClass.about}
                onClick={() => addNewClass()}
              >
                Publicar
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mx-2">
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

        <div className="input-group input-group-sm mb-2">
          <span className="input-group-text">Ciudad</span>
          <input
            type="text"
            className="form-control"
            disabled
            value={user.city}
            readOnly
          />
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
  );
};
