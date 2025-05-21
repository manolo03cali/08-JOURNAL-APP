// Importaciones necesarias
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"; // Componentes para navegación y renderizado de rutas

// Componente de diseño para rutas públicas
export const PublicLayout = () => {
  const { status } = useSelector((state) => state.auth);
  if (status === "authenticated") {
    return <Navigate to="/journal" replace />;
  }
  return (
    // Contenedor principal para el layout público
    <div className="container">
      {/* Renderiza aquí las rutas hijas definidas en el enrutador principal */}
      <Outlet />
    </div>
  );
};
