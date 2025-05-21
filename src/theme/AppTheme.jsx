// Primero importo ThemeProvider desde MUI. Esto me permite aplicar un tema personalizado
import { ThemeProvider } from "@mui/material/styles";

// Luego importo CssBaseline, que me ayuda a aplicar estilos base consistentes (como un reset de CSS moderno)
import CssBaseline from "@mui/material/CssBaseline";

// También importo el tema personalizado que ya creé anteriormente (en este caso, `purpleTheme`)
import { purpleTheme } from "./";

// Defino un componente funcional llamado AppTheme. Este componente recibe `children`,
// que son todos los componentes hijos que estarán envueltos por el tema
export const AppTheme = ({ children }) => {
  return (
    // Aquí uso ThemeProvider y le paso mi tema personalizado
    <ThemeProvider theme={purpleTheme}>
      {/* CssBaseline aplica un conjunto de estilos base en toda la app: 
          elimina márgenes por defecto, aplica una tipografía base, y más cosas útiles */}
      <CssBaseline />

      {/* Finalmente, renderizo todos los componentes hijos dentro del proveedor de tema.
          Esto asegura que todo lo que esté dentro utilice mi tema personalizado */}
      {children}
    </ThemeProvider>
  );
};
