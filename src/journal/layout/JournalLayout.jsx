// Importo useState para manejar el estado local del componente
import { useState } from "react";

// Importo Box y Toolbar desde Material UI para construir la estructura del layout
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Importo mis componentes personalizados NavBar y SideBar
import { NavBar, SideBar } from "../components";

// Defino el ancho del sidebar, lo usaré tanto en el SideBar como en el NavBar para mantenerlos alineados
const drawerWidth = 280;

// Defino el layout principal de la app (JournalLayout), que recibirá como prop el contenido que quiero renderizar dentro
export const JournalLayout = ({ children }) => {
  // Creo un estado que me va a permitir saber si el sidebar está abierto o cerrado (útil para pantallas pequeñas)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Retorno el layout usando un Box con display flex para alinear NavBar, SideBar y el contenido principal
  return (
    <Box
      sx={{ display: "flex" }} // Hago que los elementos hijos se acomoden horizontalmente
      className="animate__animated animate__fadeIn animate_faster" // Le agrego una animación al cargar
    >
      {/* Renderizo el NavBar y le paso el ancho del drawer para que se acomode correctamente */}
      {/* También le paso una función que se va a ejecutar cuando se haga clic en el botón de hamburguesa */}
      <NavBar
        drawerWidth={drawerWidth}
        onOpenSidebar={() => setIsSidebarOpen(true)} // Abre el sidebar
      />

      {/* Renderizo el SideBar con el mismo ancho para mantener la consistencia visual */}
      {/* También le paso el estado `isOpen` y una función para cerrarlo cuando se necesite */}
      <SideBar
        drawerWidth={drawerWidth}
        isOpen={isSidebarOpen}
        onCloseDrawer={() => setIsSidebarOpen(false)} // Cierra el sidebar
      />

      {/* Este Box representa el área principal de la aplicación (contenido principal) */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Agrego un Toolbar vacío solo para que el contenido no quede oculto debajo del NavBar */}
        <Toolbar />

        {/* Aquí renderizo lo que me pasen como children dentro del layout (por ejemplo, las páginas o vistas) */}
        {children}
      </Box>
    </Box>
  );
};
