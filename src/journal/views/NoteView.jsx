// Importa un ícono (disquete) de Material UI, usado comúnmente para representar la acción de "guardar".
import SaveOutlined from "@mui/icons-material/SaveOutlined";

// Importa varios componentes de la librería Material UI para construir la interfaz:
// Button (botón), Grid (sistema de rejilla), TextField (campos de texto), y Typography (texto con estilos tipográficos).
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Importa un componente personalizado llamado ImageGallery, que probablemente muestra una galería de imágenes asociadas a la nota.
import { ImageGallery } from "../components";

// Define el componente funcional NoteView, que representa la vista de una nota (cuando estás editando o creando una).
export const NoteView = () => {
  return (
    // Contenedor principal tipo Grid (rejilla), con configuración de dirección horizontal y espaciado.
    <Grid
      container
      direction="row" // Los elementos hijos se colocan en fila (horizontal)
      justifyContent="space-between" // Distribuye los elementos con espacio entre ellos
      alignItems="center" // Alinea verticalmente al centro
      sx={{ mb: 1 }} // Aplica un margen inferior
    >
      {/* Columna con la fecha de la nota */}
      <Grid>
        <Typography fontSize={39} fontWeight="light">
          28 de Agosto de 2025
        </Typography>
      </Grid>

      {/* Columna con el botón para guardar la nota */}
      <Grid>
        <Button color="primary" sx={{ padding: 2 }}>
          {/* Ícono de guardar con tamaño 30 y un pequeño margen derecho */}
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      {/* Campo de texto para el título de la nota */}
      <TextField
        type="text" // Tipo de input: texto
        variant="filled" // Estilo visual del campo
        fullWidth // Ocupa todo el ancho disponible
        placeholder="Ingrese un titulo" // Texto de ayuda cuando está vacío
        label="Titulo" // Etiqueta del campo
        sx={{ border: "none", mb: 1 }} // Sin borde y con margen inferior
      />

      {/* Campo de texto para el contenido de la nota */}
      <TextField
        type="text"
        variant="filled"
        fullWidth
        multiline // Permite múltiples líneas
        placeholder="Que sucedio en el dia de hoy?" // Ayuda para el usuario
        minRows={5} // Muestra al menos 5 líneas de alto
        sx={{ border: "none", mb: 1 }}
      />

      {/* Galería de imágenes asociadas a la nota */}
      <ImageGallery />
    </Grid>
  );
};
