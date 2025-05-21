// Importa el ícono "TurnedInNot" de los iconos de Material UI
import TurnedInNot from "@mui/icons-material/TurnedInNot";

// Importa varios componentes de Material UI necesarios para la estructura del sidebar
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Componente funcional SideBar que recibe una prop opcional drawerWidth con valor por defecto 240px
export const SideBar = ({ drawerWidth = 240 }) => {
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
            Manuel Quintero
          </Typography>
        </Toolbar>

        {/* Línea divisoria debajo del título */}
        <Divider />

        {/* Lista de elementos del sidebar */}
        <List>
          {/* Se recorre un array de meses para generar elementos de lista */}
          {["Enero", "Febrero", "Marzo"].map((text) => (
            <ListItem key={text} disablePadding>
              {/* Botón clickeable que contiene el ícono y texto */}
              <ListItemButton>
                {/* Ícono en cada ítem */}
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>

                {/* Texto principal y secundario (una breve descripción) */}
                <ListItemText
                  primary={text}
                  secondary={
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
