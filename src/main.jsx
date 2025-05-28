// Importo StrictMode de React para ayudarme a identificar problemas en el código durante el desarrollo
import { StrictMode } from "react";

// Importo createRoot para crear el root donde voy a montar toda mi app React en el DOM
import { createRoot } from "react-dom/client";

// Importo los estilos globales que tengo en styles.css
import "./styles.css";

// Importo el componente principal de mi aplicación, que contiene toda la lógica y vistas del diario
import { JournalApp } from "./JournalApp";

// Importo el componente que envuelve mi app con el tema personalizado (colores, tipografía, etc)
import { AppTheme } from "./theme";

// Importo Provider de react-redux, que me permite conectar mi store global de Redux con mi aplicación React
import { Provider } from "react-redux";

// Importo la store que configuré para manejar el estado global con Redux
import { store } from "./store/store";

// Aquí creo el root de React y monto mi aplicación dentro del elemento HTML con id "root"
createRoot(document.getElementById("root")).render(
  // Envuelvo mi aplicación con StrictMode para detectar errores y malas prácticas
  <StrictMode>
    {/* Uso Provider para que toda la app tenga acceso al store de Redux */}
    <Provider store={store}>
      {/* Uso AppTheme para aplicar el tema personalizado a toda la aplicación */}
      <AppTheme>
        {/* Renderizo el componente principal JournalApp, que es la app del diario */}
        <JournalApp />
      </AppTheme>
    </Provider>
  </StrictMode>
);
