# Diario React + Vite + Firebase + MUI + Redux Toolkit

Este proyecto es una aplicación tipo diario (journal app) construida con tecnologías modernas como React + Vite, Material UI para la interfaz, Redux Toolkit para el manejo global del estado y Firebase como backend. Está optimizado para desarrollo rápido, mantenible y escalable.

**[Demo en línea](https://zesty-lolly-990836.netlify.app/)**

---

## Tecnologías principales

- **React + Vite**: Bundler moderno y ultra rápido.
- **Material UI (MUI)**: Librería de componentes visuales con soporte de temas.
- **Redux Toolkit**: Manejo global del estado con slices y store preconfigurado.
- **Firebase**: Backend con Firestore (base de datos), Auth y Storage.
- **React Router v6.4+**: Ruteo moderno con soporte para loaders, layouts y rutas protegidas.
- **Animate.css**: Animaciones visuales sencillas.
- **SweetAlert2**: Alertas y modales con diseño moderno.
- **Cloudinary**: Almacenamiento externo para imágenes.
- **Jest + @testing-library/react**: Pruebas unitarias y de integración.

---

## Estructura del proyecto

````bash
src/
├── auth/                # Autenticación (Login, Registro)
├── firebase/            # Configuración de Firebase
├── helpers/             # Funciones auxiliares (e.g., cargar notas, subir,archivos, cargar env, leer notas)
├── hooks/               # Funciones especiales controlan:formularios, estado de autenticación
├── journal/             # Módulo de diario (notas, página principal)
├── layouts/             # Componentes que protegen rutas
├── routes/              # Configuración de rutas con react-router-dom
├── store/               # Redux Toolkit (slices y configuración del store)
└── tests/               # Pruebas unitarias
├── theme/               # Tema personalizado con Material UI
├── ui/                  # Componentes reutilizables de interfaz
---

##  Instalación y ejecución

```bash
# Clonar el proyecto
git clone https://github.com/tu-usuario/diario-app.git
cd diario-app

# Instalar dependencias
yarn install

# Ejecutar el proyecto
yarn dev
````

---

## Configuración inicial

1. **ESLint + Prettier** configurados para mantener código limpio y formateado.
2. **Firebase** configurado con archivo `firebase/config.js` y variables de entorno.
3. **Theme personalizado** usando `createTheme` de MUI en `theme/purpleTheme.js`.

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:

```env
VITE_FIREBASE_APIKEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_BUCKET
VITE_FIREBASE_MESSAGINGSENDERID=TU_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

---

## Funcionalidades clave

- Autenticación con Firebase (registro/login/logout).
- Creación, edición, borrado y visualización de notas.
- Subida de imágenes a Cloudinary.
- Sincronización en tiempo real con Firestore.
- Rutas protegidas según el estado de autenticación.
- Modales de confirmación y éxito con SweetAlert2.

---

## Pruebas automatizadas

Las pruebas se realizan con `Jest` y `@testing-library/react`.

```bash
yarn add -D jest @testing-library/react @testing-library/jest-dom
```

### Ejemplos de pruebas incluidas:

- `authSlice.test.js`: Verifica login/logout del estado de autenticación.
- `journalSlice.test.js`: Prueba el estado de las notas del diario.
- `thunks.test.js`: Pruebas de las acciones asíncronas como `startNewNote`.
- `firebaseProviders.test.js`: Mocks de autenticación de Firebase.
- `loadNotes.test.js`: Carga de notas desde Firestore.
- `uploadImage.test.js`: Subida de archivos a Cloudinary (mock).

---

## Instalación de librerías esenciales

```bash
# Material UI
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material

# React Router v6.4+
yarn add react-router-dom

# Redux Toolkit
yarn add @reduxjs/toolkit react-redux

# Firebase
yarn add firebase

# SweetAlert2
yarn add sweetalert2

# Animate.css (agregar en el index.html)
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>

# dotenv (permite cargar variables de entorno)
yarn add -D dotenv


```

---

## Rutas protegidas

Las rutas se definen con `createBrowserRouter`. Se usa un layout raíz (`RootLayout`) con hijos privados y públicos, dependiendo del estado de autenticación.

```js
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "journal", element: <JournalPage />, private: true },
    ],
  },
]);
```

---

## Subida de imágenes

La subida se realiza con un helper que hace `POST` a la API de Cloudinary usando `fetch` o `axios`:

```js
const formData = new FormData();
formData.append("file", file);
formData.append("upload_preset", "preset_name");

const resp = await fetch(url, {
  method: "POST",
  body: formData,
});
```

---

## Conclusión

Este proyecto demuestra cómo construir una aplicación moderna con:

- Renderizado rápido con Vite.
- Interfaz cuidada con Material UI.
- Autenticación segura con Firebase.
- Manejo de rutas moderno con react.
- Notas sincronizadas en tiempo real.
- Pruebas unitarias y de integración automatizadas.
