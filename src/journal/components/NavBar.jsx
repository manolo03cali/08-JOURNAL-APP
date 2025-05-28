// Primero importo dos íconos de Material UI:
// - uno para el botón de cerrar sesión (LogoutOutlined)
// - otro para el botón del menú (MenuOutlined), que aparecerá como el botón de hamburguesa
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

// Luego importo los componentes que voy a usar para construir la barra de navegación superior (AppBar)
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// También importo la acción `startLogout` desde mis thunks de Redux para poder cerrar sesión
import { startLogout } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";

// Declaro el componente NavBar. Recibo por props:
// - el ancho del drawer (sidebar) con un valor por defecto de 240
// - y una función `onOpenSidebar` para abrir el sidebar (cuando se haga clic en el botón de menú)
export const NavBar = ({ drawerWidth = 240, onOpenSidebar }) => {
  // Obtengo la función `dispatch` para poder lanzar acciones a Redux
  const dispatch = useDispatch();

  // Esta función se ejecuta cuando el usuario hace clic en el botón de logout
  // y lanza la acción que se encarga de cerrar la sesión
  const onLogout = () => {
    dispatch(startLogout());
  };

  // Devuelvo el JSX que representa mi barra de navegación superior
  return (
    // Uso el componente AppBar de MUI para crear una barra fija en la parte superior
    <AppBar
      position="fixed" // La fijo en la parte superior
      sx={{
        // En pantallas medianas o grandes, reduzco el ancho para que no se sobreponga al sidebar
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        // Aplico un margen izquierdo para que comience justo después del sidebar
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* Uso un Toolbar para organizar el contenido de la AppBar */}
      <Toolbar>
        {/* Este es el botón de hamburguesa para abrir el menú lateral (sidebar) */}
        {/* Solo se muestra en pantallas pequeñas */}
        <IconButton
          color="inherit" // El color se hereda del AppBar
          edge="start" // Lo coloco al principio (izquierda)
          onClick={onOpenSidebar} // Al hacer clic, abro el sidebar
          sx={{
            mr: 2, // Le doy un margen a la derecha
            display: { sm: "none" }, // Lo oculto en pantallas medianas o grandes
          }}
        >
          {/* Renderizo el ícono del menú */}
          <MenuOutlined />
        </IconButton>

        {/* Uso Grid para organizar horizontalmente el título de la app y el botón de logout */}
        <Grid
          container // Indico que es un contenedor flex
          direction="row" // Los ítems se organizan en fila
          justifyContent="space-between" // Los elementos se separan a los extremos
          alignItems="center" // Centrado verticalmente
          sx={{ width: "100%" }} // Ocupo todo el ancho disponible
        >
          {/* Muestro el título de la app */}
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>

          {/* Botón de logout */}
          <IconButton onClick={onLogout} color="error">
            {/* Ícono de cerrar sesión (de color rojo por el color="error") */}
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
