import { Link } from "react-router-dom";

export const Navbar = () => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("token-init-date");
    window.location.reload();
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 bg-dark w-full border-b-2">
      <ul className="nav nav-underline gap-4">
        <li className="nav-item">
          <Link className="nav-link text-light" to="/classes">
            Clases <i className="ri-timer-flash-line"></i>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-light" to="/account">
            Cuenta <i className="ri-home-2-line"></i>
          </Link>
        </li>
        <li className="nav-item">
          <button className="nav-link text-light" onClick={logout}>
            Salir <i className="ri-logout-box-r-line"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};
