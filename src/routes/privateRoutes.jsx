// Importo el diseño (layout) privado que solo debería ver el usuario autenticado
import { PrivateLayout } from "../layouts";
// Importo la página principal del diario, que es la funcionalidad protegida
import { JournalPage } from "../journal";
// Importo una página de error para rutas que no existan o no coincidan
import { ErrorPage } from "../auth";

// Defino las rutas privadas de mi aplicación
export const privateRoutes = [
  {
    // Uso PrivateLayout como el contenedor principal para estas rutas privadas
    element: <PrivateLayout />,
    children: [
      // Aquí defino las rutas hijas que se renderizan dentro de PrivateLayout

      // Cuando la ruta sea "/journal", muestro la página principal del diario
      { path: "journal", element: <JournalPage /> },

      // Para cualquier otra ruta que no coincida ("*"), muestro la página de error
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
