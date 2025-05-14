// Importa el proveedor de temas desde Emotion (usado por MUI para estilos)
import { ThemeProvider } from "@emotion/react";

// Importa el componente CssBaseline, que establece estilos base globales consistentes
import { CssBaseline } from "@mui/material";

// Importa el tema personalizado que has definido (en este caso, un tema púrpura)
import { purpleTheme } from "./";

// Define el componente funcional AppTheme, que recibe como prop los "children" (componentes hijos)
export const AppTheme = ({ children }) => {
  return (
    // Envuelve toda la aplicación en ThemeProvider para aplicar el tema personalizado
    <ThemeProvider theme={purpleTheme}>
      {/* CssBaseline establece un estilo base coherente en todos los navegadores 
          (resetea márgenes, tipografías, colores de fondo, etc.) */}
      <CssBaseline />

      {/* Renderiza todos los componentes hijos dentro del proveedor de tema */}
      {children}
    </ThemeProvider>
  );
};
