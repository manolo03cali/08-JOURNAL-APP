// Importo un ícono de estrella desde Material UI, que usaré para mostrar cuando no hay ninguna nota seleccionada.
import StarRateOutlined from "@mui/icons-material/StarRateOutlined";

// Importo componentes de Material UI para organizar el diseño y mostrar texto: Grid y Typography.
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

// Defino mi componente funcional NothingSelectedView,
// que se mostrará cuando el usuario no haya seleccionado ninguna nota aún.
export const NothingSelectedView = () => {
  return (
    // Aquí creo un contenedor Grid que uso como layout principal,
    // lo configuro para que los elementos estén en columna y centrados tanto vertical como horizontalmente.
    <Grid
      className="animate__animated animate__fadeIn animate_faster" // Aplico animaciones para que aparezca con fadeIn rápido.
      container // Le digo que es un contenedor flexbox para organizar los hijos.
      spacing={0} // No dejo espacio entre los elementos hijos.
      direction="column" // Dispongo los hijos en columna, uno debajo del otro.
      alignItems="center" // Centro los hijos horizontalmente.
      justifyContent="center" // Centro los hijos verticalmente.
      sx={{
        minHeight: "calc(100vh - 110px)", // Ajusto la altura para que ocupe casi toda la pantalla menos 110px (quizá espacio para header).
        backgroundColor: "primary.main", // Pongo el fondo con el color principal del tema.
        borderRadius: 3, // Redondeo las esquinas del contenedor.
      }}
    >
      {/* Aquí pongo el ícono de estrella, grande y de color blanco para que sea un elemento visual llamativo */}
      <Grid>
        <StarRateOutlined sx={{ fontSize: 100, color: "white" }} />
      </Grid>

      {/* Finalmente, muestro un texto que le dice al usuario que debe seleccionar o crear una nota */}
      <Grid>
        <Typography color="white" variant="h5">
          Selecciona o crea una nota
        </Typography>
      </Grid>
    </Grid>
  );
};
