// 1. Dependencias de React y librerías principales
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

// 2. Librerías de terceros (Material UI)
import { Google } from "@mui/icons-material";
import { Button, Link, TextField, Typography, Grid } from "@mui/material";

// 3. Componentes locales
import { AuthLayout } from "../layout/AuthLayout";

// 4. Hooks personalizados
import { useForm } from "../../hooks";

// 5. Redux actions/thunks
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth";
const formData = {
  email: "manolo.ing@gmail.com",
  password: "123456",
};

// Componente de página de Login
export const LoginPage = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({ email, password });
    dispatch(checkingAuthentication());
  };
  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };
  return (
    // Usa el layout de autenticación y le pasa el título "Login"
    <AuthLayout title="Login">
      {/* Formulario de login */}
      <form onSubmit={onSubmit}>
        {/* Contenedor con Grid para organizar los campos y botones */}
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* Campo de correo electrónico */}
          <Grid size={12}>
            {/* 'size' en reemplazo de 'item xs={12}' */}
            <TextField
              label="Correo" // Etiqueta del input
              type="email" // Tipo de input
              placeholder="correo@google.com" // Texto guía
              fullWidth // Ocupa el ancho completo del contenedor
              name="email"
              value={email}
              onChange={onInputChange}
            />
          </Grid>

          {/* Campo de contraseña */}
          <Grid size={12}>
            {/* size en reemplazo de 'item xs={12}' */}
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
            />
          </Grid>

          {/* Botón de inicio de sesión */}
          <Grid size={{ xs: 12, sm: 6 }}>
            {/* size en reemplazo de 'item xs={12} sm={6}' */}
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
              Login
            </Button>
          </Grid>

          {/* Botón de inicio de sesión con Google */}
          <Grid size={{ xs: 12, sm: 6 }}>
            <Button
              disabled={isAuthenticating}
              variant="contained"
              fullWidth
              onClick={onGoogleSignIn}
            >
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
