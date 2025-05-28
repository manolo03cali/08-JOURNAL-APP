// Primero importo la función createTheme de MUI, que me permite crear un tema personalizado para mi app.
// Esto me facilita definir colores, tipografías y otros estilos globales.
import { createTheme } from "@mui/material/styles/";

// Importo una paleta de color rojo predefinida que viene en MUI.
// La usaré para definir el color que se aplicará a los estados de error.
import { red } from "@mui/material/colors/";

// Ahora creo y exporto mi tema personalizado llamado purpleTheme.
// Este objeto contiene la configuración de colores y otras opciones que quiero para mi app.
export const purpleTheme = createTheme({
  // Activo las variables CSS para poder usar los colores del tema directamente en CSS,
  // lo que me da más flexibilidad para estilos personalizados fuera de componentes MUI.
  cssVariables: true,

  // Aquí defino la paleta de colores principal del tema:
  palette: {
    primary: {
      main: "#262254", // El color principal será un morado oscuro que elegí a mano.
    },
    secondary: {
      main: "#543884", // El color secundario es otro morado, pero más claro.
    },
    error: {
      main: red.A400, // Para los errores uso un rojo intenso que ya viene definido en MUI,
      // así mantengo consistencia y un buen contraste.
    },
  },
});
