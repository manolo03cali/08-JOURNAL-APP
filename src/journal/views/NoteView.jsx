// Importo el ícono de disquete que usaré para representar la acción de "guardar".
import SaveOutlined from "@mui/icons-material/SaveOutlined";

// Importo varios componentes de Material UI para construir la interfaz: botones, rejilla, campos de texto y texto con estilos.
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

// Importo un hook personalizado para manejar formularios.
import { useForm } from "../../hooks";

// Importo un componente personalizado para mostrar una galería de imágenes de la nota.
import { ImageGallery } from "../components";

// Importo funciones para manejar el estado global con Redux.
import { useDispatch, useSelector } from "react-redux";

// Importo hooks de React que usaré para efectos secundarios, memorizar valores y referencias.
import { useEffect, useMemo, useRef } from "react";

// Importo acciones para actualizar el estado del diario en Redux.
import {
  setActiveNote,
  startSaveNote,
  startUploadingFiles,
  startDeletingNote,
} from "../../store/journal";

// Importo SweetAlert2 para mostrar alertas bonitas.
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

// Importo componentes y iconos adicionales para botones y subida de archivos.
import Fab from "@mui/material/Fab";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import { DeleteOutline } from "@mui/icons-material";

// Defino el componente funcional NoteView que representa la vista para editar o crear una nota.
export const NoteView = () => {
  // Obtengo el dispatch para poder enviar acciones a Redux.
  const dispatch = useDispatch();

  // Obtengo el estado actual del diario: la nota activa, mensajes de guardado y si está guardando.
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);

  // Uso mi hook personalizado para manejar el formulario de la nota.
  // Extraigo el cuerpo, título, fecha y función para manejar cambios.
  const { body, title, date, onInputChange, formState } = useForm(note);

  // Convierto la fecha de la nota a un string legible y memorizo para no recalcularlo cada render.
  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  // Creo una referencia para el input de archivos, para poder abrirlo con un botón.
  const fileInputRef = useRef();

  // Cuando cambia el mensaje de guardado, muestro una alerta con SweetAlert2 para confirmar que la nota se guardó.
  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  // Función que guardará la nota: actualizo la nota activa y disparo la acción de guardado.
  const onSaveNote = () => {
    dispatch(setActiveNote(formState));
    dispatch(startSaveNote());
  };

  // Función que se ejecuta cuando cambio el input de archivos (para subir imágenes).
  // Valido que haya archivos, actualizo la nota activa y despacho la acción de subir archivos.
  const onFileInputChange = ({ target }) => {
    if (target.files.length === 0) return;
    dispatch(setActiveNote(formState));
    dispatch(startUploadingFiles(target.files));
  };

  // Función para eliminar la nota actual.
  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  // Aquí construyo el JSX que renderiza toda la interfaz para editar la nota.
  return (
    <Grid
      container
      spacing={2}
      className="animate__animated animate__fadeIn animate_faster"
      sx={{ p: 2 }}
      direction="column"
    >
      {/* Encabezado con la fecha y los botones para subir archivos y guardar */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        {/* Muestro la fecha de la nota con un estilo grande y ligero */}
        <Grid>
          <Typography fontSize={39} fontWeight="light">
            {dateString}
          </Typography>
        </Grid>

        {/* Contenedor para los botones: subir archivos y guardar */}
        <Grid>
          <Grid container spacing={1} alignItems="center" mt={{ xs: 2, sm: 0 }}>
            {/* Input oculto para seleccionar archivos */}
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />

            {/* Botón flotante para abrir el selector de archivos */}
            <Grid>
              <Fab
                color="inherit"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
              >
                <UploadOutlined />
              </Fab>
            </Grid>

            {/* Botón para guardar la nota, con ícono de disquete */}
            <Grid>
              <Button
                disabled={isSaving}
                onClick={onSaveNote}
                color="primary"
                sx={{ px: 3 }}
                startIcon={<SaveOutlined sx={{ fontSize: 30 }} />}
              >
                Guardar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Campo de texto para el título de la nota */}
      <Grid>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
        />
      </Grid>

      {/* Campo de texto multilinea para el cuerpo de la nota */}
      <Grid>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      {/* Botón para eliminar la nota, con ícono de papelera */}
      <Grid container justifyContent="flex-end">
        <Button onClick={onDelete} color="error" startIcon={<DeleteOutline />}>
          Eliminar
        </Button>
      </Grid>

      {/* Componente para mostrar la galería de imágenes asociadas a la nota */}
      <Grid>
        <ImageGallery images={note.imageUrls || []} />
      </Grid>
    </Grid>
  );
};
