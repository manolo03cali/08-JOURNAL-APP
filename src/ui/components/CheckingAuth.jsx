import CircularProgress from "@mui/material/CircularProgress"; // Importo el componente de spinner circular de Material UI
import Grid from "@mui/material/Grid"; // Importo el sistema de grillas de Material UI para organizar el layout

// Este componente lo uso para mostrar una pantalla de carga mientras se verifica el estado de autenticación
export const CheckingAuth = () => {
  return (
    // Uso un Grid como contenedor principal para centrar visualmente el contenido
    <Grid
      container // Le indico que este Grid actuará como contenedor (flexbox)
      spacing={0} // No quiero espacios entre los elementos hijos
      direction="column" // Acomodo los elementos verticalmente (uno debajo del otro)
      alignItems="center" // Centra el contenido horizontalmente
      justifyContent="center" // Centra el contenido verticalmente
      sx={{
        minHeight: "100vh", // Hago que este contenedor ocupe el 100% del alto de la ventana
        backgroundColor: "primary.main", // Uso el color principal del tema como fondo
        padding: 4, // Agrego un poco de padding alrededor del contenido
      }}
    >
      {/* Este Grid interno contiene el spinner de carga */}
      <Grid direction="row" justifyContent="center">
        {/* Aquí muestro un spinner circular para indicar que algo está cargando */}
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
