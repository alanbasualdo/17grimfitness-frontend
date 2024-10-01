import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useClassStore } from "../hooks/useClassesStore";
import Swal from "sweetalert2";
import { useUserClass } from "../hooks/useUserClass";

export const Classes = () => {
  const { startGetClasses } = useClassStore();
  const { startSubscribeClass } = useUserClass();
  const { classes } = useSelector((state) => state.class);

  // Mapeo de los días de la semana a un valor numérico
  const dayOrder = {
    Lunes: 1,
    Martes: 2,
    Miércoles: 3,
    Jueves: 4,
    Viernes: 5,
    Sábado: 6,
    Domingo: 7,
  };

  // Agrupar las clases por día de la semana
  const classesByDay = Object.keys(
    classes.reduce((acc, classItem) => {
      if (!acc[classItem.day]) {
        acc[classItem.day] = [];
      }
      acc[classItem.day].push(classItem);
      return acc;
    }, {})
  );

  // Ordenar las clases por día de la semana
  const sortedClasses = classesByDay.sort((a, b) => dayOrder[a] - dayOrder[b]);

  const subscribeToTheClass = (gymClass) => {
    Swal.fire({
      title: `¿Quieres inscribirte a ésta clase?\n${gymClass.about}\n${gymClass.day} de ${gymClass.from} a ${gymClass.to}`,
      showDenyButton: true,
      confirmButtonText: "Sí, inscribirme",
      denyButtonText: "No",
      customClass: {
        popup: "text-sm",
        confirmButton: "bg-success",
        denyButton: "bg-secondary",
        content: "font-thin",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const data = await startSubscribeClass(gymClass);
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
          Swal.fire("Error", "No se pudo inscribir a la clase", "error");
        }
      } else if (result.isDenied) {
        return;
      }
    });
  };

  useEffect(() => {
    startGetClasses();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {sortedClasses.map((day, index) => (
          <div key={index} className="col-md-6 mb-3">
            <div className="text-center">
              <div
                className="p-2 rounded-lg border-2 bg-dark"
                style={{ overflowX: "auto" }}
              >
                <h4 className="font-bold text-light">{day}</h4>
                <hr className="text-light m-0 p-0" />
                <table className="table table-hover text-sm table-dark">
                  <thead>
                    <tr>
                      <th scope="col">Horario</th>
                      <th scope="col">Clase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes
                      .filter((classItem) => classItem.day === day)
                      .map((classItem, index) => (
                        <tr
                          key={index}
                          className="cursor-pointer"
                          onClick={() => subscribeToTheClass(classItem)}
                        >
                          <td>{`${classItem.from} - ${classItem.to}`}</td>
                          <td>{classItem.about}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
