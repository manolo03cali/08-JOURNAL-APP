// Importo los componentes de React Router y Material UI que necesito
import { Link as RouterLink } from "react-router-dom"; // Esto me permite usar enlaces de navegación
import Button from "@mui/material/Button"; // Botón estilizado de MUI
import Link from "@mui/material/Link"; // Enlace de texto
import TextField from "@mui/material/TextField"; // Campo de texto
import Typography from "@mui/material/Typography"; // Texto tipográfico
import Grid from "@mui/material/Grid"; // Sistema de grillas
import Alert from "@mui/material/Alert"; // Alerta visual para errores

// Layout base que voy a reutilizar en mis vistas de autenticación
import { AuthLayout } from "../layout/AuthLayout";

// Importo mi hook personalizado para manejar formularios
import { useForm } from "../../hooks";

// Importo hooks de React y Redux
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Acción que dispara la creación de usuario
import { startCreatingUserWithEmailPassword } from "../../store/auth/thunks";

// Estado inicial del formulario
const formData = {
  displayName: "",
  email: "",
  password: "",
};

// Validaciones que quiero aplicar a cada campo del formulario
const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener mas de 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

// Componente funcional principal de la página de registro
export const RegisterPage = () => {
  const dispatch = useDispatch(); // Preparo el dispatcher para disparar acciones
  const [formSubmitted, setFormsubmitted] = useState(false); // Para saber si ya envié el formulario

  const { status, errorMessage } = useSelector((state) => state.auth); // Me traigo del estado global el `status` y posibles errores
  const isAuthenticating = useMemo(() => status === "checking", [status]); // Solo activo botones si no estoy autenticando

  // Uso mi hook `useForm` con los datos y validaciones
  const {
    formState, // contiene todos los valores del formulario juntos
    displayName,
    email,
    password,
    onInputChange, // función para manejar los cambios
    isFormValid, // si todo el formulario es válido
    displayNameValid,
    emailValid,
    passwordValid,
  } = useForm(formData, formValidations);

  // Esta es la función que se ejecuta al enviar el formulario
  const onSubmit = (event) => {
    event.preventDefault(); // Evito el comportamiento por defecto del form
    setFormsubmitted(true); // Marco que ya intenté enviar

    if (!isFormValid) return; // Si el formulario no es válido, no hago nada
    dispatch(startCreatingUserWithEmailPassword(formState)); // Envío la acción para crear el usuario
  };

  return (
    <AuthLayout title="Crear cuenta">
      {/* Esto lo dejo para debug: me muestra si el formulario es válido */}
      <h1>FormValid: {isFormValid ? "Válido" : "Incorrecto"}</h1>

      {/* Formulario */}
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate_faster"
      >
        <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
          {/* Campo para el nombre */}
          <Grid size={12}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Nombre completo"
              fullWidth
              name="displayName"
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmitted} // Muestra error solo si ya envié
              helperText={displayNameValid} // Texto del error
            />
          </Grid>

          {/* Campo para el correo */}
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

          {/* Campo para la contraseña */}
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

          {/* Muestra un error general si viene del backend */}
          <Grid size={{ xs: 12 }} display={!!errorMessage ? "block" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>
          </Grid>

          {/* Botón de crear cuenta */}
          <Grid size={{ xs: 12 }}>
            <Button
              disabled={isAuthenticating} // Desactivo si está cargando
              type="submit"
              variant="contained"
              fullWidth
            >
              Crear cuenta
            </Button>
          </Grid>
        </Grid>

        {/* Enlace a la página de login */}
        <Grid container direction="row" justifyContent="end" sx={{ mt: 1 }}>
          <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
          <Link component={RouterLink} color="inherit" to="/login">
            Ingresar
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  );
};
