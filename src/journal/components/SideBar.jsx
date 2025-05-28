// Primero importo los componentes de Material UI que voy a usar para construir el sidebar
import Box from "@mui/material/Box"; // Contenedor flexible
import Divider from "@mui/material/Divider"; // Línea divisoria
import Drawer from "@mui/material/Drawer"; // El panel lateral como tal
import List from "@mui/material/List"; // Lista de ítems (notas)
import Toolbar from "@mui/material/Toolbar"; // Espaciado superior (altura del AppBar)
import Typography from "@mui/material/Typography"; // Para mostrar texto (nombre del usuario)

// Importo useSelector para poder leer datos del estado global en Redux
import { useSelector } from "react-redux";

// Importo mi componente SideBarItem que representa cada nota en la lista lateral
import { SideBarItem } from "./";

// Defino el componente SideBar. Recibo:
// - drawerWidth: ancho del sidebar (por defecto 240px)
// - isOpen: indica si el drawer temporal (en móviles) está abierto
// - onCloseDrawer: función para cerrarlo
export const SideBar = ({ drawerWidth = 240, isOpen, onCloseDrawer }) => {
  // Accedo al estado de autenticación en Redux para obtener el nombre del usuario logueado
  const { displayName } = useSelector((state) => state.auth);

  // Accedo al estado de journal para obtener todas las notas guardadas
  const { notes } = useSelector((state) => state.journal);

  // Creo el contenido del drawer, que se usará tanto para móviles como escritorio
  const drawerContent = (
    <>
      {/* Espaciado superior que alinea con el AppBar */}
      <Toolbar>
        {/* Muestro el nombre del usuario logueado */}
        <Typography variant="h6" noWrap component="div">
          {displayName}
        </Typography>
      </Toolbar>

      {/* Línea divisoria entre el nombre y la lista de notas */}
      <Divider />

      {/* Listado de todas las notas, cada una renderizada con SideBarItem */}
      <List>
        {notes.map((note) => (
          <SideBarItem key={note.id} {...note} />
        ))}
      </List>
    </>
  );

  // Devuelvo el contenedor del sidebar
  return (
    <Box
      component="nav" // Este Box funciona como un contenedor de navegación
      sx={{
        width: { sm: drawerWidth }, // Defino el ancho del sidebar en pantallas medianas en adelante
        flexShrink: { sm: 0 }, // Evito que se encoja
      }}
    >
      {/* Drawer temporal (para pantallas pequeñas como celulares) */}
      <Drawer
        variant="temporary" // Se muestra como modal que se puede abrir/cerrar
        open={isOpen} // Controlo si está abierto desde la prop isOpen
        onClose={onCloseDrawer} // Lo cierro con la función que recibo por props
        ModalProps={{
          keepMounted: true, // Esto mejora el rendimiento en móviles
        }}
        sx={{
          display: { xs: "block", sm: "none" }, // Solo visible en pantallas pequeñas
          "& .MuiDrawer-paper": {
            boxSizing: "border-box", // Evito que colapse el contenido
            width: drawerWidth, // Le doy el ancho recibido
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Drawer permanente (pantallas grandes como tablets o escritorios) */}
      <Drawer
        variant="permanent" // Siempre visible
        open // Siempre abierto
        sx={{
          display: { xs: "none", sm: "block" }, // Solo en pantallas medianas o grandes
          "& .MuiDrawer-paper": {
            boxSizing: "border-box", // Igual que en el temporal
            width: drawerWidth, // Mismo ancho
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};
