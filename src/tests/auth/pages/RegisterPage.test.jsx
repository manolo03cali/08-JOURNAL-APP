// Primero importo lo necesario para renderizar componentes y simular interacciones en pruebas
import { fireEvent, render, screen } from "@testing-library/react";
// Traigo el componente que quiero probar
import { RegisterPage } from "../../../auth/pages/RegisterPage";
// Importo Provider para poder envolver el componente con el store de Redux
import { Provider } from "react-redux";
// Importo una función que me permite crear un store de Redux configurado para la prueba
import { configureStore } from "@reduxjs/toolkit";
// Como RouterPage está dentro de un sistema de rutas, uso MemoryRouter para simular el entorno de navegación
import { MemoryRouter } from "react-router-dom";
// Traigo el slice de autenticación y las funciones que voy a simular (mockear)
import { authSlice } from "../../../store/auth";
import { startCreatingUserWithEmailPassword } from "../../../store/auth/thunks";
// Importo un estado simulado donde el usuario no está autenticado
import { notAuthenticatedState } from "../../fixtures/authFixtures";

// Creo mis propias funciones "mock" que van a simular el comportamiento de los thunks
const mockstartCreatingUserWithEmailPassword = jest.fn();

// Aquí le digo a Jest que, cuando se importe `startCreatingUserWithEmailPassword`,
// en realidad use mis mocks en lugar de las funciones reales
jest.mock("../../../store/auth/thunks", () => ({
  startCreatingUserWithEmailPassword: ({ email, password, displayName }) => {
    return () =>
      mockstartCreatingUserWithEmailPassword({ email, password, displayName });
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

describe("Pruebas en <RegisterPage/>", () => {
  // Antes de cada test limpio los mocks, para evitar que datos anteriores contaminen otras pruebas
  beforeEach(() => jest.clearAllMocks());
  test("Debe de mostrar el componente correctamente", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );
    // Verifico que el texto "Login" esté visible al menos una vez en pantalla
    expect(screen.getAllByText("Crear cuenta").length).toBeGreaterThanOrEqual(
      1
    );
    expect(
      screen.getAllByText("Nombre completo").length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Correo").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Contraseña").length).toBeGreaterThanOrEqual(1);

    //También verifico que exista un botón con el texto "crear cuenta"
    expect(
      screen.getByRole("button", { name: /Crear cuenta/i })
    ).toBeInTheDocument();
  });
  test("submit debe de llamar el startCreatingUserWithEmailPassword con el correo y contraseña", () => {
    // Defino un correo y contraseña de prueba para simular el login
    const email = "victoria@victoria.com";
    const password = "mipassword123";
    const displayName = "Jose Manuel Quintero Ferreira";

    // Renderizo el componente
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterPage />
        </MemoryRouter>
      </Provider>
    );

    // Busco el campo de email por su etiqueta (label) "Nombre completo"
    const nombreCompletoField = screen.getByRole("textbox", {
      name: "Nombre completo",
    });
    // Busco el campo de email por su etiqueta (label) "Nombre completo"
    const emailField = screen.getByRole("textbox", { name: "Correo" });

    // Busco el campo de contraseña por un data-testid personalizado
    const passwordField = screen.getByTestId("password");

    // Simulo que el usuario escribe en el campo de Nombre completo
    fireEvent.change(nombreCompletoField, {
      target: { name: "displayName", value: displayName },
    });
    // Simulo que el usuario escribe en el campo de email
    fireEvent.change(emailField, {
      target: { value: email },
    });

    // Simulo que el usuario escribe en el campo de contraseña
    fireEvent.change(passwordField, {
      target: { value: password },
    });

    // Busco un formulario
    const registerForm = screen.getByLabelText("submit-form");

    // Simulo el envío del formulario (como si el usuario hiciera clic en "Crear cuenta")
    fireEvent.submit(registerForm);

    // Verifico que mi función mock haya sido llamada con el email y contraseña correctos
    expect(mockstartCreatingUserWithEmailPassword).toHaveBeenCalledWith({
      displayName: displayName,
      email: email,
      password: password,
    });
    expect(registerForm).toBeInTheDocument();
  });
});
