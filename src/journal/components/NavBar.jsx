// Importo dos íconos de Material UI: uno para cerrar sesión (LogoutOutlined) y otro para el menú (MenuOutlined)
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

// Importo los componentes de Material UI que voy a usar para construir la barra superior (AppBar)
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Importo la acción startLogout para poder cerrar sesión desde Redux
import { startLogout } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";

// Defino el componente NavBar que puede recibir el ancho del sidebar (drawerWidth), con valor por defecto 240
export const NavBar = ({ drawerWidth = 240 }) => {
  // Obtengo el dispatch para poder lanzar acciones a Redux
  const dispatch = useDispatch();

  // Creo la función onLogout que cuando se ejecute dispara la acción startLogout para cerrar sesión
  const onLogout = () => {
    dispatch(startLogout());
  };

  // Retorno el JSX que representa la barra superior de la app
  return (
    // AppBar es la barra fija en la parte superior de la pantalla
    <AppBar
      position="fixed" // La fijo en la parte superior para que siempre esté visible
      sx={{
        // En pantallas medianas o mayores, reduzco el ancho para que no quede debajo del sidebar
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        // Aplico un margen izquierdo para que empiece después del sidebar
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* Toolbar es el contenedor dentro del AppBar que me ayuda a organizar los elementos */}
      <Toolbar>
        {/* Botón para abrir el menú (hamburguesa), solo visible en pantallas pequeñas */}
        <IconButton
          color="inherit" // El color lo hereda del AppBar
          edge="start" // Está al principio, al lado izquierdo
          sx={{ mr: 2, display: { sm: "none" } }} // Tiene margen a la derecha y se oculta en pantallas sm o más grandes
        >
          <MenuOutlined /> {/* Aquí muestro el ícono del menú */}
        </IconButton>

        {/* Uso Grid para separar el título y el botón de logout, alineándolos a los extremos */}
        <Grid
          container // Hago que sea un contenedor flexbox
          direction="row" // La dirección de los items es horizontal
          justifyContent="space-between" // Pongo espacio entre el título y el botón
          alignItems="center" // Centrado verticalmente
          sx={{ width: "100%" }} // Ocupa todo el ancho disponible
        >
          {/* Aquí muestro el título de la app */}
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>

          {/* Botón para cerrar sesión, con el ícono rojo de logout */}
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined /> {/* Ícono de cerrar sesión */}
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
