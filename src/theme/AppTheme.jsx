// Primero importo el componente ThemeProvider de MUI,
// que me permite envolver mi aplicación para aplicar un tema personalizado.
import { ThemeProvider } from "@mui/material/styles";

// Luego importo CssBaseline, que es como un reset moderno de CSS,
// me ayuda a que los estilos base sean consistentes en toda la app.
import CssBaseline from "@mui/material/CssBaseline";

// También importo el tema personalizado que ya definí antes, llamado purpleTheme.
import { purpleTheme } from "./";

// Ahora defino un componente funcional llamado AppTheme,
// que recibe como prop a `children` (los componentes que voy a envolver con este tema).
export const AppTheme = ({ children }) => {
  return (
    // Uso ThemeProvider para envolver a los children con mi tema personalizado purpleTheme,
    // así todos los componentes dentro pueden acceder a esos estilos.
    <ThemeProvider theme={purpleTheme}>
      {/* Incluyo CssBaseline para asegurar que todos los estilos base estén aplicados:
          esto elimina márgenes por defecto, define una tipografía base, etc. */}
      <CssBaseline />

      {/* Aquí renderizo todo lo que esté dentro de AppTheme, 
          asegurando que todos los componentes hijos usen mi tema. */}
      {children}
    </ThemeProvider>
  );
};
