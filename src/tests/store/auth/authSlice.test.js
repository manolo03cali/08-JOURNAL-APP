// Primero, importo las funciones y datos necesarios:
// - El slice de autenticación con sus acciones: checkingCredentials, login, logout
// - Los diferentes estados de autenticación (inicial, autenticado, no autenticado) y un usuario de prueba
import {
  authSlice,
  checkingCredentials,
  login,
  logout,
} from "../../../store/auth/authSlice";
import {
  authenticatedState,
  demoUser,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authFixtures";

// Inicio un bloque de pruebas para el slice de autenticación
describe("Pruebas en authSlice", () => {
  // Primera prueba: quiero asegurarme de que el slice esté bien definido
  test("Debe de regresar el estado inicial y llamarse 'auth'", () => {
    // Verifico que el nombre del slice sea el esperado
    expect(authSlice.name).toBe("auth");

    // Llamo al reducer sin pasarle una acción para obtener el estado inicial
    const state = authSlice.reducer(initialState, {});

    // Espero que el estado resultante sea igual al que definí como estado inicial
    expect(state).toEqual(initialState);
  });

  // Segunda prueba: verifico si el login actualiza correctamente el estado
  test("Debe de realizar la autenticación", () => {
    // Llamo al reducer pasándole el estado inicial y la acción de login con el usuario de prueba
    const state = authSlice.reducer(initialState, login(demoUser));

    // Espero que el estado resultante indique que el usuario está autenticado y tenga los datos correctos
    expect(state).toEqual({
      status: "authenticated", // Cambia el estado a 'authenticated'
      uid: demoUser.uid, // Incluye el UID del usuario
      email: demoUser.email, // Incluye el email
      displayName: demoUser.displayName, // Incluye el nombre
      photoURL: demoUser.photoURL, // Incluye la foto
      errorMessage: null, // No debe haber errores
    });
  });

  // Tercera prueba: pruebo que el logout funcione correctamente sin mensaje de error
  test("Debe de realizar el logout sin argumentos", () => {
    // Simulo que el usuario ya está autenticado
    const state = authSlice.reducer(authenticatedState, logout());

    // Espero que vuelva al estado no autenticado (predefinido en los fixtures)
    expect(state).toEqual(notAuthenticatedState);
  });

  // Cuarta prueba: logout pero esta vez con un mensaje de error
  test("Debe de realizar el logout con argumentos", () => {
    const errorMessage = "Credenciales incorrectas";

    // Simulo el logout pasando un mensaje de error
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    // Espero que se limpien los datos del usuario pero se conserve el mensaje de error
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage, // Este es el mensaje que se debería mostrar en la interfaz
    });
  });

  // Quinta prueba: simulo el inicio de verificación de credenciales
  test("Debe de cambiar el estado a checking", () => {
    // Parto de un estado autenticado y aplico la acción de checkingCredentials
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    // Solo espero que el status cambie a "checking"
    expect(state.status).toBe("checking");
  });
});
