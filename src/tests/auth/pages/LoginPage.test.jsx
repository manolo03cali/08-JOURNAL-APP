// Primero importo lo necesario para renderizar componentes y simular interacciones en pruebas
import { fireEvent, render, screen } from "@testing-library/react";

// Traigo el componente que quiero probar
import { LoginPage } from "../../../auth/pages/LoginPage";

// Importo Provider para poder envolver el componente con el store de Redux
import { Provider } from "react-redux";

// Importo una función que me permite crear un store de Redux configurado para la prueba
import { configureStore } from "@reduxjs/toolkit";

// Como LoginPage está dentro de un sistema de rutas, uso MemoryRouter para simular el entorno de navegación
import { MemoryRouter } from "react-router-dom";

// Traigo el slice de autenticación y las funciones que voy a simular (mockear)
import { authSlice } from "../../../store/auth";
import { startGoogleSignIn } from "../../../store/auth/thunks";

// Importo un estado simulado donde el usuario no está autenticado
import { notAuthenticatedState } from "../../fixtures/authFixtures";

// Creo mis propias funciones "mock" que van a simular el comportamiento de los thunks
const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

// Aquí le digo a Jest que, cuando se importe `startGoogleSignIn` o `startLoginWithEmailPassword`,
// en realidad use mis mocks en lugar de las funciones reales
jest.mock("../../../store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPassword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

// Creo un store personalizado para esta prueba, con el slice de auth y un estado predefinido
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

// Defino el bloque principal de pruebas para el componente <LoginPage />
describe("Pruebas en componente <LoginPage/>", () => {
  // Antes de cada test limpio los mocks, para evitar que datos anteriores contaminen otras pruebas
  beforeEach(() => jest.clearAllMocks());

  test("Debe de mostrar el componente correctamente", () => {
    // Renderizo el componente envuelto en el Provider de Redux y el Router
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Verifico que el texto "Login" esté visible al menos una vez en pantalla
    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);

    // También verifico que exista un botón con el texto "login"
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("Botón de Google debe de llamar el startGoogleSignIn", () => {
    // Renderizo el componente nuevamente
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Busco el botón de Google que tiene el atributo aria-label="google-btn"
    const googleBtn = screen.getByLabelText("google-btn");

    // Simulo que el usuario hace clic en ese botón
    fireEvent.click(googleBtn);

    // Verifico que mi función mock haya sido llamada (o sea, que se disparó el thunk simulado)
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit debe de llamar el startLoginWithEmailPassword con el correo y contraseña", () => {
    // Defino un correo y contraseña de prueba para simular el login
    const email = "victoria@victoria.com";
    const password = "mipassword123";

    // Renderizo el componente
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    // Busco el campo de email por su etiqueta (label) "Correo"
    const emailField = screen.getByRole("textbox", { name: "Correo" });

    // Busco el campo de contraseña por un data-testid personalizado
    const passwordField = screen.getByTestId("password");

    // Simulo que el usuario escribe en el campo de email
    fireEvent.change(emailField, {
      target: { name: "email", value: email },
    });

    // Simulo que el usuario escribe en el campo de contraseña
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });

    // Busco el formulario por su aria-label personalizado
    const loginForm = screen.getByLabelText("submit-form");

    // Simulo el envío del formulario (como si el usuario hiciera clic en "Login")
    fireEvent.submit(loginForm);

    // Verifico que mi función mock haya sido llamada con el email y contraseña correctos
    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
