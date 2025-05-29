// Importo todo lo que necesito para las pruebas:
// - Las acciones y el slice de autenticación desde mi store
// - Los estados de prueba y usuario demo desde mis fixtures
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

// Empiezo a describir el grupo de pruebas para authSlice
describe("Pruebas en authSlice", () => {
  // Primer test: Verifico el estado inicial
  test("Debe de regresar el estado inicial y llamarse 'auth'", () => {
    // Compruebo que el nombre del slice sea 'auth'
    expect(authSlice.name).toBe("auth");

    // Obtengo el estado llamando al reducer sin ninguna acción
    const state = authSlice.reducer(initialState, {});

    // Verifico que el estado sea igual al initialState
    expect(state).toEqual(initialState);
  });

  // Test para la acción de login
  test("Debe de realizar la autenticación", () => {
    // Ejecuto el reducer con el estado inicial y la acción login con el usuario demo
    const state = authSlice.reducer(initialState, login(demoUser));

    // Espero que el estado resultante coincida con un usuario autenticado
    expect(state).toEqual({
      status: "authenticated", // Estado cambia a autenticado
      uid: demoUser.uid, // Debe tener el uid del usuario demo
      email: demoUser.email, // Email del usuario demo
      displayName: demoUser.displayName, // Nombre mostrado
      photoURL: demoUser.photoURL, // URL de la foto
      errorMessage: null, // Sin mensajes de error
    });
  });

  // Test para logout SIN mensaje de error
  test("Debe de realizar el logout sin argumentos", () => {
    // Parto del estado autenticado y ejecuto logout sin argumentos
    const state = authSlice.reducer(authenticatedState, logout());

    // Debería volver al estado no autenticado
    //notAuthenticatedState ya contiene exactamente los valores que esperas tras el logout
    expect(state).toEqual(notAuthenticatedState);
  });

  // Test para logout CON mensaje de error
  test("Debe de realizar el logout con argumentos", () => {
    const errorMessage = "Credenciales incorrectas";

    // Ejecuto logout con un mensaje de error
    const state = authSlice.reducer(
      authenticatedState,
      logout({ errorMessage })
    );

    // Verifico que todo se resetee excepto el errorMessage
    expect(state).toEqual({
      status: "not-authenticated",
      uid: null,
      email: null,
      displayName: null,
      photoURL: null,
      errorMessage: errorMessage, // Mensaje de error persiste
    });
  });

  // Test para el estado "checking" (cuando se verifican credenciales)
  test("Debe de cambiar el estado a checking", () => {
    // Parto del estado autenticado y ejecuto checkingCredentials
    const state = authSlice.reducer(authenticatedState, checkingCredentials());

    // Solo verifico que el status cambie a "checking"
    expect(state.status).toBe("checking");
  });
});
