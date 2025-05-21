import { createTheme } from "@mui/material/styles/"; // Importo la función que me permite crear un tema personalizado con MUI
import { red } from "@mui/material/colors/"; // Importo una paleta de color rojo predefinida de MUI (la voy a usar para el color de error)

// Creo una instancia de tema personalizada y la exporto como `purpleTheme`
export const purpleTheme = createTheme({
  cssVariables: true, // Activo las variables CSS del tema (útil si quiero usar los colores en estilos personalizados o externos)
  palette: {
    primary: {
      main: "#262254", // Defino un color personalizado como color primario (un tono morado oscuro)
    },
    secondary: {
      main: "#543884", // Defino un color secundario (otro tono morado más claro)
    },
    error: {
      main: red.A400, // Para los errores, uso un rojo intenso (predefinido en la paleta de MUI)
    },
  },
});
