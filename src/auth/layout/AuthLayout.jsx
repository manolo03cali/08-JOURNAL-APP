// Importa componentes de Material UI necesarios para el layout de autenticación
import { Typography, Grid } from "@mui/material";

// Componente AuthLayout: layout base para las páginas de autenticación (login, registro, etc.)
export const AuthLayout = ({ children, title = "" }) => {
  return (
    // Contenedor principal (Grid) que ocupa toda la altura de la pantalla
    <Grid
      container // Define que este Grid actuará como contenedor flexbox
      spacing={0} // Sin espacio entre elementos
      direction="column" // Apila los elementos en columna
      alignItems="center" // Centra los elementos horizontalmente
      justifyContent="center" // Centra los elementos verticalmente
      sx={{
        minHeight: "100vh", // Ocupa el alto total del viewport
        backgroundColor: "primary.main", // Color de fondo principal (definido en el tema)
        padding: 4, // Padding externo del contenedor
      }}
    >
      {/* Caja interna que contiene el contenido del formulario */}
      <Grid
        className="box-shadow" // Clase CSS opcional para darle sombra al contenedor
        size={3} // Propiedad no válida en Grid (probablemente un error, se debería eliminar o reemplazar)
        sx={{
          width: { xs: "100%", sm: 450 }, // Ocupa 100% en pantallas pequeñas, 450px en sm+
          backgroundColor: "white", // Fondo blanco
          padding: 3, // Padding interno
          borderRadius: 2, // Bordes redondeados
        }}
      >
        {/* Título del formulario, como "Login" o "Registro" */}
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {/* Contenido que se inyecta desde el componente hijo (formulario, etc.) */}
        {children}
      </Grid>
    </Grid>
  );
};
