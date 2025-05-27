// Primero importo `configureStore` desde Redux Toolkit.
// Esto me permite crear de forma más sencilla y segura mi store de Redux.
import { configureStore } from "@reduxjs/toolkit";

// Luego importo los slice, que contiene tanto el reducer como las acciones.
import { authSlice } from "./auth";
import { journalSlice } from "./journal";

// Ahora configuro y creo mi store principal de Redux.
export const store = configureStore({
  // En el objeto `reducer`, defino los slices que usaré en mi aplicación.
  // Aquí le digo a Redux: "usa el reducer de `authSlice` y guárdalo bajo la clave 'auth'".
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
  },
});

// Estoy creando el almacenamiento global de estado (store) de mi aplicación.

// Le paso a Redux el reducer que maneja todo lo relacionado con autenticación (auth).

// Esto me permitirá, desde cualquier parte de mi app, leer el estado de autenticación o despachar acciones como login, logout, etc.
