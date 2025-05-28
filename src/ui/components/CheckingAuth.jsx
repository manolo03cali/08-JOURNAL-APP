// Importo el componente CircularProgress de Material UI, que es un spinner circular que usaré para mostrar que algo está cargando
import CircularProgress from "@mui/material/CircularProgress";

// Importo el componente Grid de Material UI, que me sirve para crear un layout basado en grillas con flexbox y así organizar mejor el contenido
import Grid from "@mui/material/Grid";

// Defino el componente funcional CheckingAuth, que usaré para mostrar una pantalla de carga mientras verifico si el usuario está autenticado
export const CheckingAuth = () => {
  return (
    // Uso un Grid como contenedor principal para centrar el contenido tanto horizontal como verticalmente
    <Grid
      container // Le indico que este Grid es un contenedor flexbox
      spacing={0} // No quiero espacio extra entre sus elementos hijos
      direction="column" // Organizo los elementos en columna (de arriba hacia abajo)
      alignItems="center" // Centro los elementos horizontalmente en el contenedor
      justifyContent="center" // Centro los elementos verticalmente en el contenedor
      sx={{
        // Uso la prop sx para añadir estilos personalizados
        minHeight: "100vh", // Que ocupe toda la altura de la ventana del navegador
        backgroundColor: "primary.main", // Uso el color principal definido en el tema como fondo del contenedor
        padding: 4, // Le agrego un padding para que el contenido no quede pegado a los bordes
      }}
    >
      {/* Dentro de este Grid pongo otro Grid para el spinner */}
      <Grid direction="row" justifyContent="center">
        {/* Aquí muestro el spinner circular, con color de advertencia (warning) para que sea visible */}
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
