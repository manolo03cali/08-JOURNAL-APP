// Importaciones necesarias de React Router y MUI (Material UI)
import { Link as RouterLink } from "react-router-dom"; // Para crear enlaces que funcionen con React Router
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { AuthLayout } from "../layout/AuthLayout"; // Componente de layout para la vista de autenticación
// 4. Hooks personalizados
import { useForm } from "../../hooks";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";
const formData = {
  displayName: "",
  email: "",
  password: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener mas de 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

// Componente funcional para la página de registro
export const RegisterPage = () => {
  const dispatch = useDispatch();
  const [formSubmitted, setFormsubmitted] = useState(false);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const {
    formState,
    displayName,
    email,
    password,
    onInputChange,
    isFormValid,
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = (event) => {
    event.preventDefault();
    setFormsubmitted(true);

    if (!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  };

  return (
    // Se usa el layout de autenticación con el título "Register"
    <AuthLayout title="Crear cuenta">
      <h1>FormValid: {isFormValid ? "Válido" : "Incorrecto"}</h1>
      {/* Inicio del formulario */}
      <form onSubmit={onSubmit}>
        {/* Contenedor de los campos de entrada */}
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* Campo de Nombre */}
          <Grid size={12}>
            <TextField
              label="Nombre completo" // Etiqueta visible para el campo
              type="text" // Tipo de campo
              placeholder="Nombre completo" // Texto sugerido
              fullWidth // Ocupa todo el ancho disponible
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted}
              helperText={displayNameValid}
            />
          </Grid>

          {/* Campo de Correo */}
          <Grid size={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>

          {/* Campo de Contraseña */}
          <Grid size={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>

          {/* Botón para crear cuenta */}

          <Grid
            size={{ xs: 12, sm: 12 }}
            display={!!errorMessage ? "" : "none"}
          >
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          {/* Botón para crear cuenta */}
          <Grid size={{ xs: 12, sm: 12 }}>
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
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
