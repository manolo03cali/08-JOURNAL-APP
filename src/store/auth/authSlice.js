// Primero defino el estado inicial de la autenticación con valores por defecto
const initialState = {
  status: "checking", // Empiezo asumiendo que estoy verificando el estado del usuario
  uid: null, // No tengo un ID de usuario todavía
  email: null, // Tampoco tengo un email aún
  displayName: null, // Tampoco tengo un nombre para mostrar
  photoURL: null, // Tampoco una foto de perfil
  errorMessage: null, // No hay mensajes de error por ahora
};

// Uso createSlice para crear el "slice" del estado de autenticación
export const authSlice = createSlice({
  name: "auth", // Le pongo un nombre para identificarlo
  initialState, // Uso el estado inicial que definí arriba
  reducers: {
    // Defino las funciones que cambian el estado (reducers)
    checkingCredentials: (state) => {
      // Cuando estoy verificando las credenciales, cambio el estado a "checking"
      state.status = "checking";
    },
    login: (state, { payload }) => {
      // Cuando el usuario hace login correctamente, actualizo el estado con sus datos
      state.status = "authenticated"; // Indico que está autenticado
      state.uid = payload.uid; // Guardo el ID del usuario
      state.email = payload.email; // Guardo su email
      state.displayName = payload.displayName; // Guardo su nombre para mostrar
      state.photoURL = payload.photoURL; // Guardo la URL de su foto
      state.errorMessage = null; // Limpio cualquier mensaje de error
    },
    logout: (state, { payload }) => {
      // Cuando el usuario cierra sesión, limpio toda la info y cambio estado
      state.status = "not-authenticated"; // Indico que ya no está autenticado
      state.uid = null;
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      // Si recibo un mensaje de error al cerrar sesión, lo guardo, sino queda null
      state.errorMessage = payload?.errorMessage || null;
    },
    error: (state, action) => {
      // Si sucede un error genérico relacionado con la autenticación, lo guardo aquí
      state.error = action.payload;
    },
  },
});

// Finalmente exporto las funciones (action creators) que usaré para cambiar el estado
export const { login, logout, checkingCredentials, error } = authSlice.actions;
