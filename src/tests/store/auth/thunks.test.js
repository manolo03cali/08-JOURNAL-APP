// Importo las funciones que se comunican directamente con Firebase
import {
  LoginWithEmailPassword, // Para iniciar sesión con email y contraseña
  logoutFirebase, // Para cerrar sesión
  signInWithGoogle, // Para iniciar sesión con Google
} from "../../../firebase/providers";

// Importo acciones del slice auth
import { checkingCredentials, error, login, logout } from "../../../store/auth";

// Importo los thunks que quiero probar
import {
  startCheckingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailPassword,
  startLogout,
} from "../../../store/auth/thunks";

// Usuario de prueba que uso como respuesta esperada en las pruebas
import { demoUser } from "../../fixtures/authFixtures";

// Acción del slice journal que borra notas al cerrar sesión
import { clearNotesLogout } from "../../../store/journal";

// Simulo completamente los métodos del archivo providers.js
jest.mock("../../../firebase/providers");

// Agrupo todas las pruebas relacionadas a los thunks de autenticación
describe("Pruebas en auth/thunk", () => {
  // Simulo la función dispatch de Redux
  const dispatch = jest.fn();

  // Limpio todos los mocks antes de cada prueba para evitar datos residuales
  beforeEach(() => jest.clearAllMocks());

  // PRUEBA 1: Verifico que el thunk startCheckingAuthentication solo llame a checkingCredentials
  test("Debe de invocar el checkingCredentials", async () => {
    await startCheckingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  // PRUEBA 2: Caso exitoso al hacer login con Google
  test("startGoogleSignIn debe de llamar checkingCredentials y login -> Éxito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    // Simulo que la función signInWithGoogle devuelve un login exitoso
    await signInWithGoogle.mockResolvedValue(loginData);

    // Llamo al thunk
    await startGoogleSignIn()(dispatch);

    // Verifico que se haya despachado checkingCredentials primero
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    // Luego que se haya despachado login con los datos recibidos
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  // PRUEBA 3: Caso fallido al hacer login con Google
  test("startGoogleSignIn debe de llamar checkingCredentials y logout -> Fracaso", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Un error en Google",
    };

    // Simulo error en el login con Google
    await signInWithGoogle.mockResolvedValue(loginData);

    // Llamo al thunk
    await startGoogleSignIn()(dispatch);

    // Verifico que primero se haya llamado checkingCredentials
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    // Y luego logout con el error recibido
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  // PRUEBA 4: Login con email y contraseña exitoso
  test("startLoginWithEmailPassword debe de llamar checkingCredentials y login -> Éxito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
    };

    // Simulo login exitoso
    await LoginWithEmailPassword.mockResolvedValue(loginData);

    // Llamo al thunk con los datos del formulario
    await startLoginWithEmailPassword(formData)(dispatch);

    // Verifico que se haya llamado checkingCredentials y luego login
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  // PRUEBA 5: Login con email y contraseña con error
  test("startLoginWithEmailPassword debe de llamar checkingCredentials y logout -> Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Credenciales incorrectas test",
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
    };

    // Simulo login con error
    await LoginWithEmailPassword.mockResolvedValue(loginData);

    // Llamo al thunk
    await startLoginWithEmailPassword(formData)(dispatch);

    // Espero que se llame primero checkingCredentials
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());

    // Luego logout con el mensaje de error
    expect(dispatch).toHaveBeenCalledWith(
      logout({ errorMessage: "Credenciales incorrectas test" })
    );
  });

  // PRUEBA 6: Logout completo
  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    // Llamo al thunk de logout
    await startLogout()(dispatch);

    // Verifico que se haya llamado a logoutFirebase para cerrar sesión
    expect(logoutFirebase).toHaveBeenCalled();

    // Verifico que se limpien las notas al salir
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());

    // Y finalmente que se despache el logout del usuario
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
