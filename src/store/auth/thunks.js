// Importo funciones que manejan la autenticación con Firebase y acciones para el estado global
import {
  singIntWithGoogle, // Función para iniciar sesión con Google
  registerUserWithEmailPassword, // Función para registrar usuario con email y contraseña
  LoginWithEmailPassword, // Función para login con email y contraseña
  logoutFirebase, // Función para cerrar sesión en Firebase
} from "../../firebase/providers";

import { clearNotesLogout } from "../journal"; // Acción para limpiar notas al cerrar sesión
import { checkingCredentials, login, logout } from "./"; // Acciones del slice de auth

// Esta función verifica si estoy autenticando al usuario (p.ej. para mostrar spinner)
export const checkingAuthentication = () => {
  return async (dispatch) => {
    // Aquí aviso que estoy en proceso de verificación
    dispatch(checkingCredentials());
  };
};

// Esta función la uso para iniciar sesión con Google
export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials()); // Aviso que estoy verificando
    const result = await singIntWithGoogle(); // Llamo a Firebase para iniciar sesión con Google
    if (!result.ok) return dispatch(logout(result)); // Si falla, hago logout con el error
    dispatch(login(result)); // Si todo va bien, actualizo el estado a "logueado"
  };
};

// Esta función la uso para registrar un usuario con email, contraseña y nombre
export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials()); // Aviso que estoy verificando
    const { ok, uid, photoURL, errorMessage } =
      await registerUserWithEmailPassword({
        email,
        password,
        displayName,
      }); // Registro usuario en Firebase
    if (!ok) return dispatch(logout({ errorMessage })); // Si falla, hago logout con el error
    dispatch(login({ uid, displayName, email, photoURL })); // Si éxito, guardo datos y cambio estado
  };
};

// Esta función la uso para iniciar sesión con email y contraseña
export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials()); // Aviso que estoy verificando
    const { ok, uid, displayName, photoURL, errorMessage } =
      await LoginWithEmailPassword({
        email,
        password,
      }); // Intento login con Firebase
    if (!ok) return dispatch(logout({ errorMessage })); // Si falla, logout con error
    dispatch(login({ uid, displayName, email, photoURL })); // Si éxito, guardo datos y cambio estado
  };
};

// Esta función la uso para cerrar sesión
export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase(); // Cierro sesión en Firebase
    dispatch(clearNotesLogout()); // Limpio las notas relacionadas con el usuario
    dispatch(logout({})); // Actualizo el estado a no autenticado
  };
};
