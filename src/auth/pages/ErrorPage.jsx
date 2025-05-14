// Importa el componente Link de React Router, pero lo renombra como RouterLink para usarlo con MUI.
import { Link as RouterLink } from "react-router-dom";

// Importa componentes de Material UI: tipografía, rejilla (Grid), enlaces, botones y caja de diseño.
import { Typography, Grid, Link, Button, Box } from "@mui/material";

// Importa un layout personalizado para páginas de autenticación. Se usará como contenedor.
import { AuthLayout } from "../layout/AuthLayout";

// Importa un ícono de advertencia/error para usarlo visualmente en la página.
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

// Define el componente funcional que representa una página de error 404 (no encontrada).
export const ErrorPage = () => {
  return (
    // Usa el layout AuthLayout con el título "Error 404" en la parte superior.
    <AuthLayout title="Error 404">
      {/* Contenedor Grid central con diseño en columna y centrado vertical y horizontal */}
      <Grid
        container
        direction="column" // Los elementos hijos se organizan de arriba hacia abajo
        alignItems="center" // Centra horizontalmente
        justifyContent="center" // Centra verticalmente
        spacing={3} // Espaciado entre los elementos hijos
        sx={{ minHeight: "50vh", textAlign: "center" }} // Altura mínima y centrado de texto
      >
        {/* Ícono de advertencia de gran tamaño con color rojo de error */}
        <Grid>
          <ErrorOutlineIcon sx={{ fontSize: 80, color: "error.main" }} />
        </Grid>

        {/* Mensajes principales del error */}
        <Grid>
          <Typography variant="h3" component="h1" gutterBottom>
            Página no encontrada
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Lo sentimos, no pudimos encontrar la página que estás buscando.
          </Typography>
        </Grid>

        {/* Botón para redirigir al usuario a la página de inicio de sesión */}
        <Grid>
          <Button
            component={RouterLink} // Hace que el botón actúe como un enlace de React Router
            to="/login" // Ruta a la que se redirige al hacer clic
            variant="contained" // Botón con fondo sólido
            size="large"
            sx={{ mt: 3 }} // Margen superior
          >
            Volver al inicio
          </Button>
        </Grid>

        {/* Texto adicional con enlace a una página de contacto */}
        <Grid>
          <Typography variant="body2" color="text.secondary">
            ¿Necesitas ayuda?{" "}
            <Link component={RouterLink} to="/contact" color="primary">
              Contáctanos
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </AuthLayout>
  );
};
