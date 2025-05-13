// Importa el componente Link de react-router-dom para navegación entre rutas
import { Link as RouterLink } from "react-router-dom";

// Importa componentes de Material UI para construir el formulario
import { Button, Link, TextField, Typography, Grid } from "@mui/material";

// Importa el ícono de Google desde MUI
import { Google } from "@mui/icons-material";

// Importa el layout personalizado de autenticación
import { AuthLayout } from "../layout/AuthLayout";

// Componente de página de Login
export const LoginPage = () => {
  return (
    // Usa el layout de autenticación y le pasa el título "Login"
    <AuthLayout title="Login">
      {/* Formulario de login */}
      <form>
        {/* Contenedor con Grid para organizar los campos y botones */}
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* Campo de correo electrónico */}
          <Grid size={12}>
            {" "}
            {/* 'size' en reemplazode 'item xs={12}' */}
            <TextField
              label="Correo" // Etiqueta del input
              type="email" // Tipo de input
              placeholder="correo@google.com" // Texto guía
              fullWidth // Ocupa el ancho completo del contenedor
            />
          </Grid>

          {/* Campo de contraseña */}
          <Grid size={12}>
            {" "}
            {/* size en reemplazo de 'item xs={12}' */}
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>

          {/* Botón de inicio de sesión */}
          <Grid size={{ xs: 12, sm: 6 }}>
            {" "}
            {/* size en reemplazo de 'item xs={12} sm={6}' */}
            <Button variant="contained" fullWidth>
              Login
            </Button>
          </Grid>

          {/* Botón de inicio de sesión con Google */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button variant="contained" fullWidth>
              <Google /> {/* Ícono de Google */}
              <Typography sx={{ ml: 1 }}>Google</Typography>{" "}
              {/* Texto con margen izquierdo */}
            </Button>
          </Grid>
        </Grid>

        {/* Enlace para ir a la página de registro */}
        <Grid container direction="row" justifyContent="end">
          <Link component={RouterLink} color="inherit" to="/register">
            Crear cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
