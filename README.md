React + Vite
Este proyecto utiliza React junto con Vite para ofrecer una configuración mínima, con soporte para HMR (Hot Module Replacement) y reglas básicas de ESLint.

Actualmente, hay dos plugins oficiales disponibles para React:

@vitejs/plugin-react: usa Babel para Fast Refresh.

@vitejs/plugin-react-swc: usa SWC para Fast Refresh.

🔧 ESLint y buenas prácticas
Si estás desarrollando una aplicación para producción, se recomienda el uso de TypeScript junto con reglas de linting basadas en tipos.

Consulta el template oficial con TypeScript para saber cómo integrar TypeScript y typescript-eslint.

📦 Librerías utilizadas
Material UI
Instalación:

bash
Copiar
Editar
yarn add @mui/material @emotion/react @emotion/styled
Fuente Roboto
Material UI utiliza la fuente Roboto por defecto. Se recomienda incluirla manualmente en el archivo index.html:

html
Copiar
Editar

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>
Iconos
Para incluir iconos de Material UI:

bash
Copiar
Editar
yarn add @mui/icons-material
Tema personalizado (Ejemplo: purpleTheme)
Puedes crear un tema personalizado siguiendo la documentación oficial de Material UI.

🧭 Sistema de rutas
Este proyecto implementa el sistema de rutas de react-router-dom v6.4+, utilizando createBrowserRouter, una práctica recomendada en lugar de BrowserRouter.

Estructura de rutas
RootLayout: lógica global (como autenticación).

publicRoutes: rutas públicas.

privateRoutes: rutas privadas.

appRouteDefinitions: agrupación de rutas.

AppRouter: instancia central del router.

Se usa el componente <RouterProvider router={AppRouter} /> como punto de entrada.

✅ Esta estructura es escalable, mantenible y moderna, ideal para manejar navegación condicional, roles o autenticación por rutas.

🧰 Redux Toolkit
Instalación:

bash
Copiar
Editar
yarn add @reduxjs/toolkit
yarn add react-redux
Luego, crea un directorio store/ en la raíz del proyecto y configura tu store.js o store.ts.

🔥 Firebase
Para utilizar Firebase:

Registra un proyecto en Firebase Console.

Ve a la configuración del proyecto → Configuración web.

Copia los datos y crea un archivo config.js dentro del directorio firebase/.

Instalación de la dependencia:

bash
Copiar
Editar
yarn add firebase
⚠️ El archivo config.js debe estar incluido en .gitignore, ya que contiene claves privadas.

✅ Conclusión
Este proyecto sigue una arquitectura modular y moderna con:

Vite como bundler rápido.

Material UI para componentes UI.

React Router v6.4+ para rutas protegidas y públicas.

Redux Toolkit para manejo del estado.

Firebase como backend opcional.

Ideal para comenzar proyectos con autenticación, gestión de permisos, rutas protegidas y escalabilidad.

## Animaciones de Animate.css

utilizamos el CDN y lo agregamos en el index.html
luego la usamos en las paginas que se requieran en nuestro caso login y register en el form y en el journalLayout

## Alertas con SweetAlert2

Instalamos la libreria en nuestro caso o tambien se puede usar el CDN
de acuerdo a las instrucciones de el https://sweetalert2.github.io/
