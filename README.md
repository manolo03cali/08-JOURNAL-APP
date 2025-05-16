# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Librerias utilizadas:

Material.UI
yarn add @mui/material @emotion/react @emotion/styled

## Fuente Roboto:

Se recomienda agregar la fuente Roboto manualmente si se desea utilizarla, ya que Material UI la utiliza por defecto.

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
/>

## Iconos:

Instalamos solo los iconos que necesitamos utilizando:
yarn add @mui/icons-material

Creación del tema personalizado (purpleTheme):
Creamos un tema personalizado siguiendo la documentación oficial de Material UI.

## Sistema de rutas:

Se implementa el nuevo sistema de rutas de react-router-dom versión 7, utilizando createBrowserRouter en lugar de BrowserRouter.

## Instalación de redux toolkit:

yarn add @reduxjs/toolkit
yarn add react-redux

Creamos un directorio en la raiz y configuramos el store

## Instalación de firebase:

Es necesario el registro previo, crear un proyecto y entrar a la configuración web donde nos facilita la configuración que debemos aplicar a nuestro proyecto en un archivo llamado config en el directorio firebase, ademas es necesatio instalar firebase:

yarn add firebase
