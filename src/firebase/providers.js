// Importo las funciones necesarias de Firebase Auth para poder registrar, iniciar sesión, actualizar perfil, etc.
import {
  createUserWithEmailAndPassword, // Para registrar un nuevo usuario con email y contraseña
  GoogleAuthProvider, // Proveedor de autenticación de Google
  signInWithPopup, // Para abrir una ventana emergente y permitir iniciar sesión con Google
  signInWithEmailAndPassword, // Para iniciar sesión con email y contraseña
  updateProfile, // Para actualizar el perfil del usuario (por ejemplo, su nombre)
} from "firebase/auth";

// Traigo la instancia de autenticación que configuré previamente en mi archivo de configuración de Firebase
import { FirebaseAuth } from "./config";

// Creo un proveedor de autenticación de Google para usarlo al iniciar sesión con esa cuenta
const GoogleProvider = new GoogleAuthProvider();

// ===============================================
// FUNCIÓN PARA INICIAR SESIÓN CON CUENTA DE GOOGLE
// ===============================================
export const singIntWithGoogle = async () => {
  try {
    // Abro un popup para iniciar sesión con Google y espero el resultado
    const result = await signInWithPopup(FirebaseAuth, GoogleProvider);

    // Extraigo los datos del usuario que se autenticó correctamente
    const { displayName, email, photoURL, uid } = result.user;

    // Devuelvo un objeto con el estado `ok: true` y los datos del usuario
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid,
    };
  } catch (error) {
    // Si algo falla, lo muestro en consola y devuelvo `ok: false` con el mensaje de error
    console.log(error);
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

// =================================================
// FUNCIÓN PARA REGISTRAR USUARIO CON EMAIL Y CONTRASEÑA
// =================================================
export const registerUserWithEmailPassword = async ({
  email,
  password,
  displayName,
}) => {
  try {
    // Muestro en consola los datos que recibo para verificar que están correctos
    console.log(email, password, displayName);

    // Registro al usuario con email y contraseña usando Firebase
    const resp = await createUserWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    // Extraigo el uid y la foto de perfil del usuario que se creó
    const { uid, photoURL } = resp.user;

    // Actualizo el perfil del usuario para que también tenga su nombre (displayName)
    await updateProfile(FirebaseAuth.currentUser, { displayName });

    // Devuelvo un objeto indicando que todo salió bien
    return {
      ok: true,
      uid,
      photoURL,
      email,
      displayName,
    };
  } catch (error) {
    // Si algo falla, devuelvo un objeto con `ok: false` y el mensaje de error
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};

// =================================================
// FUNCIÓN PARA INICIAR SESIÓN CON EMAIL Y CONTRASEÑA
// =================================================
export const LoginWithEmailPassword = async ({ email, password }) => {
  try {
    // Intento iniciar sesión con las credenciales proporcionadas
    const resp = await signInWithEmailAndPassword(
      FirebaseAuth,
      email,
      password
    );

    // Extraigo los datos del usuario autenticado
    const { displayName, photoURL, uid } = resp.user;

    // Devuelvo un objeto con los datos del usuario e indico que todo salió bien
    return {
      ok: true,
      displayName,
      photoURL,
      uid,
    };
  } catch (error) {
    // Si hay un error al iniciar sesión, lo capturo y lo devuelvo
    const errorMessage = error.message;

    return {
      ok: false,
      errorMessage,
    };
  }
};

// ============================
// FUNCIÓN PARA CERRAR SESIÓN
// ============================
export const logoutFirebase = async () => {
  // Llamo a la función de Firebase para cerrar sesión del usuario actual
  return await FirebaseAuth.signOut();
};
