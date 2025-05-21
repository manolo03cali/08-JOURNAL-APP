// Importa un ícono con forma de estrella desde Material UI, se usará como parte visual cuando no hay nota seleccionada.
import StarRateOutlined from "@mui/icons-material/StarRateOutlined";

// Importa componentes de diseño desde Material UI: Grid para el layout y Typography para el texto.
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Define el componente funcional NothingSelectedView.
// Este componente se muestra cuando el usuario no ha seleccionado ninguna nota.
export const NothingSelectedView = () => {
  return (
    // Contenedor principal tipo Grid con diseño en columna y centrado.
    <Grid
      container // Indica que este Grid actuará como contenedor flexible (Flexbox)
      spacing={0} // No hay espacio (margen) entre los elementos hijos
      direction="column" // Los hijos se disponen en una columna (uno debajo del otro)
      alignItems="center" // Centra horizontalmente los elementos
      justifyContent="center" // Centra verticalmente los elementos
      sx={{
        minHeight: "calc(100vh - 110px)", // Hace que el contenedor tenga casi toda la altura de la ventana, restando 110px (quizás del header)
        backgroundColor: "primary.main", // Aplica el color principal del tema como fondo
        borderRadius: 3, // Bordes redondeados
      }}
    >
      {/* Ícono grande de estrella en color blanco como elemento visual */}
      <Grid>
        <StarRateOutlined sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      {/* Texto indicativo para el usuario */}
      <Grid>
        <Typography color="white" variant="h5">
          Selecciona o crea una nota
        </Typography>
      </Grid>
    </Grid>
  );
};
