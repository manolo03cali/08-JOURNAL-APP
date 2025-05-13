// Importaciones necesarias de React Router y MUI (Material UI)
import { Link as RouterLink } from "react-router-dom"; // Para crear enlaces que funcionen con React Router
import { Button, Link, TextField, Typography, Grid } from "@mui/material"; // Componentes de interfaz de usuario
import { Google } from "@mui/icons-material"; // Icono de Google (aunque no se usa en este componente)
import { AuthLayout } from "../layout/AuthLayout"; // Componente de layout para la vista de autenticación

// Componente funcional para la página de registro
export const RegisterPage = () => {
  return (
    // Se usa el layout de autenticación con el título "Register"
    <AuthLayout title="Register">
      {/* Inicio del formulario */}
      <form>
        {/* Contenedor de los campos de entrada */}
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* Campo de Nombre */}
          <Grid size={12}>
            <TextField
              label="Nombre completo" // Etiqueta visible para el campo
              type="text" // Tipo de campo
              placeholder="Nombre completo" // Texto sugerido
              fullWidth // Ocupa todo el ancho disponible
            />
          </Grid>

          {/* Campo de Correo */}
          <Grid size={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>

          {/* Campo de Contraseña */}
          <Grid size={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>

          {/* Botón para crear cuenta */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Button variant="contained" fullWidth>
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        {/* Enlace para ir a la página de login si ya tienes cuenta */}
        <Grid container direction="row" justifyContent="end">
          <Typography sx={{ mr: 1 }}>Ya tienes cuenta?</Typography>
          <Link component={RouterLink} color="inherit" to="/login">
            Ingresar
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
