// Importo componentes de Material UI para estructura básica: Box para contenedores y Toolbar para espacio
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

// Importo mis componentes personalizados NavBar y SideBar para usarlos dentro del layout
import { NavBar, SideBar } from "../components";

// Defino una constante para el ancho del sidebar (drawer), la usaré para que NavBar y SideBar estén sincronizados
const drawerWidth = 280;

// Componente funcional JournalLayout que recibirá cualquier contenido hijo para renderizar dentro del layout principal
export const JournalLayout = ({ children }) => {
  return (
    // Uso un Box con display flex para organizar NavBar, SideBar y el contenido principal en fila
    <Box
      sx={{ display: "flex" }}
      // Aplico clases de animación para que el layout tenga una animación de entrada suave
      className="animate__animated animate__fadeIn animate_faster"
    >
      {/* Renderizo el NavBar y le paso el ancho del drawer para que se ajuste correctamente */}
      <NavBar drawerWidth={drawerWidth} />

      {/* Renderizo el SideBar con el mismo ancho para que quede alineado con NavBar */}
      <SideBar drawerWidth={drawerWidth} />

      {/* Contenedor principal del contenido que ocupa el espacio restante */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Inserto un Toolbar vacío para dejar espacio arriba equivalente a la altura del NavBar */}
        <Toolbar />

        {/* Aquí renderizo el contenido dinámico que me pasan por children, puede ser cualquier cosa */}
        {children}
      </Box>
    </Box>
  );
};
