// Importo varios componentes de Material UI que voy a usar para armar el sidebar
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Importo useSelector para obtener datos del store de Redux
import { useSelector } from "react-redux";

// Importo el componente SideBarItem que será cada ítem dentro del sidebar
import { SideBarItem } from "./";

// Defino el componente SideBar, que recibe opcionalmente el ancho del drawer, por defecto 240px
export const SideBar = ({ drawerWidth = 240 }) => {
  // Obtengo el nombre del usuario logueado desde el estado auth de Redux
  const { displayName } = useSelector((state) => state.auth);
  // Obtengo las notas desde el estado journal de Redux para mostrarlas en la lista del sidebar
  const { notes } = useSelector((state) => state.journal);

  return (
    // Uso un Box que será el contenedor del nav (sidebar), con un ancho definido para pantallas medianas en adelante
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} // Evito que se reduzca su tamaño
    >
      {/* Uso Drawer para hacer el panel lateral */}
      <Drawer
        variant="permanent" // El drawer es permanente, siempre visible (no se oculta ni desliza)
        open={true} // Lo dejo siempre abierto
        sx={{
          display: { xs: "block" }, // En pantallas pequeñas lo muestro como bloque para asegurar visibilidad
          "& .MuiDrawer-paper": {
            // Estilos específicos para el contenido del drawer
            boxSizing: "border-box", // Para que padding y borde se incluyan en el ancho
            width: drawerWidth, // Le aplico el ancho recibido por prop
          },
        }}
      >
        {/* Toolbar solo para dejar espacio alineado con la AppBar, además aquí pongo el título */}
        <Toolbar>
          {/* Muestro el nombre de usuario como título del sidebar */}
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        {/* Dibujo una línea divisoria justo debajo del título */}
        <Divider />

        {/* Aquí pongo la lista de notas que viene del estado journal */}
        <List>
          {/* Recorro cada nota y renderizo un SideBarItem, pasándole la info de la nota */}
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
