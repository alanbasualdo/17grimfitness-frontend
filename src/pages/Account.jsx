import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { useClassStore } from "../hooks/useClassesStore";
import { UserData } from "../components/UserData";
import { useUserClass } from "../hooks/useUserClass";
import { useSelector } from "react-redux";

export const Account = () => {
  const { user } = useAuthStore();
  const { startPostClass } = useClassStore();
  const { getAllClassesByUser, getInscribedUsersByClass } = useUserClass();
  const [addClass, setAddClass] = useState(false);
  const { userClasses, loadingUserClasses } = useSelector(
    (state) => state.userClasses
  );
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

  console.log(userClasses);

  useEffect(() => {
    getAllClassesByUser();
  }, []);

  const calculateTotalCost = () => {
    const numClasses = userClasses.length;
    let cost = 0;
    switch (numClasses) {
      case 1:
        cost = 6500;
        break;
      case 2:
        cost = 7500;
        break;
      case 3:
        cost = 8500;
        break;
      case 4:
        cost = 9500;
        break;
      case 5:
        cost = 10500;
        break;
      default:
        cost = numClasses > 5 ? 10500 + (numClasses - 5) * 1000 : 0; // Si hay más de 5 clases, se suma 1000 por cada clase extra
    }
    return cost;
  };

  const getClassCost = (index) => {
    switch (index + 1) {
      case 1:
        return 6500;
      case 2:
        return 7500;
      case 3:
        return 8500;
      case 4:
        return 9500;
      case 5:
        return 10500;
      default:
        return 10500 + (index - 4) * 1000; // Si hay más de 5 clases, se suma 1000 por cada clase extra
    }
  };

  return (
    <>
      <div className="text-center">
        {user.role === "AdminRole" && (
          <div className="mx-2 mb-2">
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
      </div>
      <UserData user={user} />

      <div className="flex flex-col p-2 mt-3">
        <table className="table table-bordered table-hover text-center">
          <thead className="table-secondary">
            <tr>
              <th scope="col" className="text-dark">
                Horario
              </th>
              <th scope="col" className="text-dark">
                Clase
              </th>
              <th scope="col" className="text-dark">
                Costo
              </th>
            </tr>
          </thead>
          <tbody>
            {userClasses.length > 0 ? (
              userClasses.map((userClass, index) => (
                <tr key={index} className="cursor-pointer">
                  <td>{`${userClass.class.from} - ${userClass.class.to}`}</td>
                  <td>{userClass.class.about}</td>
                  <td>{getClassCost(index)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No hay clases disponibles</td>
              </tr>
            )}
            <tr className="cursor-pointer">
              <td></td>
              <td className="font-bold">Total</td>
              <td className="font-bold">{calculateTotalCost()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
