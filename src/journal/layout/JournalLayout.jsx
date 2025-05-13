// Importa los componentes Box y Toolbar del sistema de diseño de MUI (Material UI)
import { Box, Toolbar } from "@mui/material";

// Importa los componentes personalizados NavBar y SideBar desde la carpeta de componentes
import { NavBar, SideBar } from "../components";

// Define una constante que indica el ancho del cajón lateral (sidebar)
const drawerWidth = 280;

// Componente funcional JournalLayout que recibe "children" como contenido a mostrar dentro del layout
export const JournalLayout = ({ children }) => {
  return (
    // Box principal que organiza todo en un layout de tipo "flex" (horizontal)
    <Box sx={{ display: "flex" }}>
      {/* Barra de navegación superior (Navbar) - se le pasa el ancho del drawer como prop */}
      <NavBar drawerWidth={drawerWidth} />

      {/* Barra lateral (Sidebar) - también recibe el ancho del drawer */}
      <SideBar drawerWidth={drawerWidth} />

      {/* Área principal de contenido */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Toolbar se usa para agregar espacio equivalente a la altura del NavBar */}
        <Toolbar />

        {/* Aquí se renderiza el contenido dinámico del layout, que se pasa como children */}
        {children}
      </Box>
    </Box>
  );
};
