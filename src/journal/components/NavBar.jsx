// Importa dos íconos de Material UI: uno para cerrar sesión y otro para el menú
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";

// Importa los componentes necesarios desde MUI para construir el AppBar
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { startLogout } from "../../store/auth/thunks";
import { useDispatch } from "react-redux";

// Componente funcional NavBar que recibe una prop opcional: drawerWidth (ancho del sidebar)
export const NavBar = ({ drawerWidth = 240 }) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(startLogout());
  };
  return (
    // AppBar: barra superior fija que se posiciona en la parte superior de la pantalla
    <AppBar
      position="fixed" // Hace que el AppBar esté fijo en la parte superior
      sx={{
        // En pantallas mayores al tamaño "sm", reduce el ancho del AppBar en el ancho del drawer
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        // Agrega un margen izquierdo igual al ancho del drawer (para no superponerlo)
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      {/* Toolbar: contenedor interno que alinea y da espaciado a los elementos dentro del AppBar */}
      <Toolbar>
        {/* Botón del ícono de menú (hamburguesa), visible solo en pantallas pequeñas */}
        <IconButton
          color="inherit" // Usa el color del AppBar
          edge="start" // Lo alinea al inicio (izquierda)
          sx={{ mr: 2, display: { sm: "none" } }} // Solo se muestra en pantallas xs (oculto en sm+)
        >
          <MenuOutlined /> {/* Ícono de menú */}
        </IconButton>

        {/* Grid para alinear el título y el botón de logout a los extremos */}
        <Grid
          container // Convierte el Grid en un contenedor flexbox
          direction="row" // Dirección horizontal
          justifyContent="space-between" // Espacio entre título y botón
          alignItems="center" // Alineación vertical centrada
          sx={{ width: "100%" }}
        >
          {/* Título de la aplicación */}
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>

          {/* Botón de logout con ícono */}
          <IconButton onClick={onLogout} color="error">
            <LogoutOutlined /> {/* Ícono de salida */}
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
