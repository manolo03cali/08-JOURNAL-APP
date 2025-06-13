// 1. Primero importo lo esencial de React y Redux que voy a necesitar para manejar el estado y la lógica de mi componente
//import React from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom"; // Para navegar entre rutas

// 2. Después importo componentes de Material UI para construir la interfaz del login
import Google from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

// 3. Traigo mi layout personalizado que envuelve esta vista de login
import { AuthLayout } from "../layout/AuthLayout";

// 4. Uso un hook personalizado que me ayuda a manejar los formularios fácilmente
import { useForm } from "../../hooks";

// 5. Importo las acciones de Redux que me permiten iniciar sesión con email o con Google
import {
  startGoogleSignIn,
  startLoginWithEmailPassword,
} from "../../store/auth";

// Defino el estado inicial del formulario (email y contraseña vacíos)
const formData = {
  email: "",
  password: "",
};

// Aquí empieza el componente principal de la página de login
export const LoginPage = () => {
  // Extraigo del store de Redux el estado de autenticación y los posibles mensajes de error
  const { status, errorMessage } = useSelector((state) => state.auth);

  // Inicializo la función dispatch para poder lanzar acciones de Redux
  const dispatch = useDispatch();

  // Uso mi hook personalizado useForm para manejar los campos del formulario
  const { email, password, onInputChange } = useForm(formData);

  // Uso useMemo para saber si estoy en medio de un proceso de autenticación
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  // Esta función se ejecuta cuando el usuario envía el formulario
  const onSubmit = (event) => {
    event.preventDefault(); // Prevengo que el formulario recargue la página
    // console.log({ email, password }); // Esto lo usaba para debuggear
    dispatch(startLoginWithEmailPassword({ email, password })); // Despacho la acción para iniciar sesión
  };

  // Esta función se ejecuta cuando el usuario hace clic en el botón de Google
  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn"); // Lo dejé para verificar si el clic funciona
    dispatch(startGoogleSignIn()); // Despacho la acción para iniciar sesión con Google
  };

  return (
    // Uso el layout AuthLayout para darle una estructura visual al login
    <AuthLayout title="Login">
      {/* Este es el formulario de inicio de sesión */}
      <form
        aria-label="submit-form"
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate_faster" // Clase para animar la entrada del formulario
      >
        {/* Contenedor con Grid para organizar los elementos */}
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          <Grid size={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange} // Cada vez que cambia el input, actualizo el estado
            />
          </Grid>

          <Grid size={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              inputProps={{
                "data-testid": "password",
              }}
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          {/* Si hay un error, muestro una alerta */}
          <Grid size={{ xs: 12 }} display={!!errorMessage ? "block" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          {/* Botón para iniciar sesión con email y contraseña */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              disabled={isAuthenticating} // Desactivo el botón si estoy autenticando
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          {/* Botón para iniciar sesión con Google */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              disabled={isAuthenticating}
              variant="contained"
              fullWidth
              onClick={onGoogleSignIn}
              aria-label="google-btn"
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Grid>
        </Grid>

        {/* Link para ir a la página de registro */}
        <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
          <Link component={RouterLink} color="inherit" to="/register">
            Crear cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
