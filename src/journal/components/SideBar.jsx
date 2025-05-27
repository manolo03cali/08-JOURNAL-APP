// Importa varios componentes de Material UI necesarios para la estructura del sidebar
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { SideBarItem } from "./";

// Componente funcional SideBar que recibe una prop opcional drawerWidth con valor por defecto 240px
export const SideBar = ({ drawerWidth = 240 }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);

  return (
    // Box que envuelve el nav (sidebar) y define su comportamiento en responsive
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Drawer: componente deslizable que actúa como el panel lateral */}
      <Drawer
        variant="permanent" // Variante permanente: siempre visible (no se oculta)
        open={true} // Siempre abierto
        sx={{
          display: { xs: "block" }, // En pantallas pequeñas se asegura que se muestre como bloque
          "& .MuiDrawer-paper": {
            // Estilos aplicados al papel (contenido) del Drawer
            boxSizing: "border-box",
            width: drawerWidth, // Se establece el ancho usando la prop
          },
        }}
      >
        {/* Toolbar: espacio reservado para alinear con AppBar */}
        <Toolbar>
          {/* Título del sidebar */}
          <Typography variant="h6" noWrap component="div">
            {displayName}
          </Typography>
        </Toolbar>

        {/* Línea divisoria debajo del título */}
        <Divider />

        {/* Lista de elementos del sidebar */}
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
