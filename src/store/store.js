// Primero importo la función `configureStore` que me provee Redux Toolkit.
// Esta función me facilita crear la store de Redux de forma sencilla y segura.
import { configureStore } from "@reduxjs/toolkit";

// Después importo los slices que he creado para manejar distintas partes del estado.
// Cada slice trae su reducer y acciones relacionadas.
// Aquí importo el slice de autenticación y el del diario (journal).
import { authSlice } from "./auth";
import { journalSlice } from "./journal";

// Ahora configuro y creo la store principal de Redux para toda mi aplicación.
export const store = configureStore({
  // En la propiedad `reducer` le paso un objeto con los reducers que quiero combinar.
  // Le digo a Redux que use `authSlice.reducer` para el estado `auth`
  // y que use `journalSlice.reducer` para el estado `journal`.
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});

// De esta manera estoy creando un almacenamiento global para mi app,
// donde puedo guardar y acceder a la info de autenticación y las notas del diario.

// Esto me permite, desde cualquier componente o función,
// leer el estado (como saber si el usuario está logueado)
// o despachar acciones para cambiar el estado (como hacer login o agregar una nota).
