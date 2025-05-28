// Primero, importo los componentes de Material UI que voy a necesitar para construir el layout de autenticación
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

// Ahora creo un componente funcional llamado AuthLayout, que va a recibir dos props:
// - children: el contenido que quiero mostrar dentro del layout (por ejemplo, el formulario de login)
// - title: un título opcional que quiero mostrar arriba del formulario
export const AuthLayout = ({ children, title = "" }) => {
  return (
    // Utilizo un Grid como contenedor principal. Quiero que ocupe toda la altura de la pantalla
    <Grid
      container // Le indico que actúe como contenedor flex
      spacing={0} // No quiero espacio entre los elementos internos
      direction="column" // Quiero que los elementos estén apilados verticalmente
      alignItems="center" // Centrado horizontalmente
      justifyContent="center" // Centrado verticalmente
      sx={{
        minHeight: "100vh", // Esto asegura que el Grid ocupe todo el alto del viewport
        backgroundColor: "primary.main", // Le pongo un color de fondo usando el color principal del tema
        padding: 4, // Agrego un espacio interno general al contenedor
      }}
    >
      {/* Dentro del contenedor principal, agrego otro Grid que actuará como la "caja" del formulario */}
      <Grid
        className="box-shadow" // Le doy una clase para que tenga una sombra, se vea elevado
        size={3} // ⚠️ Me doy cuenta de que esta propiedad `size` no es válida para Grid. Podría ser un error, debería revisar o eliminarla
        sx={{
          width: { xs: "100%", sm: 450 }, // En pantallas pequeñas ocupa todo el ancho, en pantallas mayores a "sm" solo 450px
          backgroundColor: "white", // Fondo blanco para que contraste con el fondo principal
          padding: 3, // Espacio interno para que el contenido no esté pegado a los bordes
          borderRadius: 2, // Bordes redondeados para que se vea más amigable
        }}
      >
        {/* Aquí muestro el título del formulario, si es que lo pasé como prop */}
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {/* Finalmente, renderizo lo que venga como children, por ejemplo, el formulario de login o registro */}
        {children}
      </Grid>
    </Grid>
  );
};
