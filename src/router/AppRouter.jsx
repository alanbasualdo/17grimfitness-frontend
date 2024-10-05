import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useAuthStore } from "../hooks/useAuthStore";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login";
import { Account } from "../pages/Account";
import { Classes } from "../pages/Classes";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Admin } from "../pages/Admin";

export const AppRouter = () => {
  const { status, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  if (status === "checking") {
    return <Loader />;
  }

  return (
    <div className="bg-gray-300">
      {status !== "not-auth" && <Navbar />}
      <Routes>
        {status === "not-auth" ? (
          <>
            <Route path="/*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate to="/classes" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/admin" element={<Admin />} />
          </>
        )}
      </Routes>
      {status !== "not-auth" && <Footer />}
    </div>
  );
};
