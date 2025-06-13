## Diario React + Vite + Firebase + MUI + Redux Toolkit

Este proyecto es una aplicación tipo diario/journal desarrollada con React y Vite, usando Material UI para la interfaz, Redux Toolkit para manejo del estado global y Firebase como backend para almacenamiento y autenticación. La configuración está optimizada para desarrollo rápido y escalable.

yarn

## Tecnologías principales

React con Vite como bundler (rápido y moderno)

Material UI (MUI) para componentes visuales y tema personalizado

Redux Toolkit para gestión global del estado

Firebase para backend (Firestore y autenticación)

React Router v6.4+ para sistema de rutas modernas y protegidas

Animate.css para animaciones sencillas vía CDN

SweetAlert2 para alertas y modales con estilo moderno

📂 Estructura recomendada y ruta de trabajo para desarrollo
Para abordar este proyecto o similares de manera ordenada y escalable, recomiendo seguir esta ruta:

1. Setup inicial
   Configura Vite + React.

Configura ESLint y Prettier para mantener calidad y formato.

Instala MUI, Animate.css y SweetAlert2.

Configura Firebase y crea el archivo config.js.

2. Diseña el tema personalizado
   Crea un tema con createTheme de MUI (como el purpleTheme).

Configura el ThemeProvider para que toda la app use el tema.

3. Configura el manejo de rutas
   Implementa react-router-dom v6.4+ con createBrowserRouter.

Define layout global (RootLayout), rutas públicas y privadas.

Usa <RouterProvider router={AppRouter} /> en la raíz.

4. Implementa el estado global con Redux Toolkit
   Crea slices para la lógica principal: autenticación (authSlice), diario (journalSlice), etc.

Configura store.js con configureStore.

Envuelve tu aplicación con <Provider store={store}>.

5. Construye componentes principales
   Componentes UI con MUI (botones, grids, inputs).

Componentes funcionales (pantalla de carga, login, journal, etc).

Usa Animate.css para animaciones en login, registro, y layout principal.

6. Implementa la lógica de negocio
   Funciones asincrónicas para Firebase: cargar notas, crear, actualizar, eliminar.

Subida de archivos (imagenes) con helpers.

Control de estados de carga con acciones Redux (e.g. savingNewNote, noteUpdated).

7. Agregar funcionalidades extras
   Modales y alertas con SweetAlert2.

Protección de rutas según autenticación/roles.

Manejo avanzado de errores y estados de carga.

8. Pruebas y ajustes finales
   Testeo básico de flujos principales.

Revisión de performance y accesibilidad.

Ajustes de estilos responsivos.

📦 Librerías principales usadas
Material UI
bash
Copiar
Editar
yarn add @mui/material @emotion/react @emotion/styled
Incluye la fuente Roboto en tu index.html para que los textos luzcan bien:

html
Copiar
Editar

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
Para íconos:

bash
Copiar
Editar
yarn add @mui/icons-material
React Router v6.4+
Usa createBrowserRouter para definir rutas en un solo lugar, por ejemplo:

js
Copiar
Editar
const router = createBrowserRouter([
{
path: "/",
element: <RootLayout />,
children: [
{ path: "login", element: <LoginPage /> },
{ path: "journal", element: <JournalPage />, private: true },
// ...
],
},
]);
Redux Toolkit
bash
Copiar
Editar
yarn add @reduxjs/toolkit react-redux
Configura el store en store/store.js y conecta con <Provider>.

Firebase
bash
Copiar
Editar
yarn add firebase
Animate.css
Agrega en index.html:

html
Copiar
Editar

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>
Usa las clases donde quieras animar, por ejemplo en login o journal layout.

SweetAlert2
bash
Copiar
Editar
yarn add sweetalert2
Úsalo para alertas o confirmaciones:

js
Copiar
Editar
import Swal from "sweetalert2";

Swal.fire({
title: "¿Estás seguro?",
text: "No podrás revertir esto",
icon: "warning",
showCancelButton: true,
confirmButtonText: "Sí, eliminar",
});

## Almacenamiento de imagenes con cloudinary

## Conclusión

Este proyecto es un ejemplo moderno y escalable para construir apps React con:

Bundling rápido con Vite.

UI consistente con Material UI y temas personalizados.

Estado global potente con Redux Toolkit.

Rutas protegidas y escalables con React Router v6.4+.

Backend moderno con Firebase.

Animaciones y alertas modernas.

Ideal para proyectos que requieren autenticación, gestión de datos y buen diseño UI.

## Prueba el proyecto en funcionamiento

Haz click [aqui](https://zesty-lolly-990836.netlify.app/)

## Variables de entorno para test:

Para el manejo de variables de entorno utilizamos la libreria dotenv esto solo funcionara para la etapa de desarrollo.
Me permite cargargar las variables de entorno en node
yarn add -D doteenv

## Variales de entorno necesarias con sus credenciales:

VITE_FIREBASE_APIKEY =
VITE_FIREBASE_AUTH_DOMAIN =
VITE_FIREBASE_PROJECT_ID =
VITE_FIREBASE_STORAGE_BUCKET =
VITE_FIREBASE_MESSAGINGSENDERID =
VITE_FIREBASE_APP_ID =
