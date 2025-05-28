// Importo `useEffect` para ejecutar efectos secundarios en el componente
import { useEffect } from "react";

// Importo hooks de Redux para interactuar con el store global
import { useDispatch, useSelector } from "react-redux";

// Importo la función de Firebase que detecta cambios en el estado de autenticación
import { onAuthStateChanged } from "firebase/auth";

// Importo la instancia de autenticación que ya configuré
import { FirebaseAuth } from "../firebase/config";

// Importo las acciones para login y logout
import { logout, login } from "../store/auth";

// Importo el thunk que carga las notas del usuario
import { startLoadingNotes } from "../store/journal";

// Este es un custom hook que creé para revisar si el usuario está autenticado o no
export const useCheckAuth = () => {
  // Obtengo el estado de autenticación actual del store (ej: "checking", "authenticated", etc.)
  const { status } = useSelector((state) => state.auth);

  // Obtengo la función dispatch para poder disparar acciones al store
  const dispatch = useDispatch();

  // Uso useEffect para que este código se ejecute una vez cuando el componente se monta
  useEffect(() => {
    // Llamo a `onAuthStateChanged` de Firebase, que escucha si el usuario inicia o cierra sesión
    // Esta función se ejecuta automáticamente cuando cambia el estado del usuario
    onAuthStateChanged(FirebaseAuth, async (user) => {
      // Si no hay usuario (está deslogueado), disparo el logout al store
      if (!user) return dispatch(logout());

      // Si hay usuario logueado, extraigo su información
      const { uid, email, displayName, photoURL } = user;

      // Disparo la acción de login con esos datos al store
      dispatch(login({ uid, email, displayName, photoURL }));

      // Y también disparo la acción para cargar las notas de ese usuario desde Firebase
      dispatch(startLoadingNotes());
    });
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez

  // Devuelvo el estado de autenticación actual para que lo puedan usar los componentes que usen este hook
  return { status };
};
