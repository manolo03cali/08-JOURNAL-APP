// Importa un ícono (disquete) de Material UI, usado comúnmente para representar la acción de "guardar".
import SaveOutlined from "@mui/icons-material/SaveOutlined";

// Importa varios componentes de la librería Material UI para construir la interfaz:
// Button (botón), Grid (sistema de rejilla), TextField (campos de texto), y Typography (texto con estilos tipográficos).
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "../../hooks";
// Importa un componente personalizado llamado ImageGallery, que probablemente muestra una galería de imágenes asociadas a la nota.
import { ImageGallery } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import {
  setActiveNote,
  startSaveNote,
  starUploadingFiles,
  startDeletingNote,
} from "../../store/journal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import Fab from "@mui/material/Fab";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import { DeleteOutline } from "@mui/icons-material";
// Define el componente funcional NoteView, que representa la vista de una nota (cuando estás editando o creando una).
export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state) => state.journal);
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);
  const fileInputRef = useRef();

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire("Nota actualizada", messageSaved, "success");
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(setActiveNote(formState));
    dispatch(startSaveNote());
  };
  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(setActiveNote(formState));
    dispatch(starUploadingFiles(target.files));
  };
  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      container
      spacing={2}
      className="animate__animated animate__fadeIn animate_faster"
      sx={{ p: 2 }}
      direction="column"
    >
      {/* Encabezado con fecha y botones */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
      >
        <Grid>
          <Typography fontSize={39} fontWeight="light">
            {dateString}
          </Typography>
        </Grid>

        <Grid>
          <Grid container spacing={1} alignItems="center" mt={{ xs: 2, sm: 0 }}>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />
            <Grid>
              <Fab
                color="inherit"
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
              >
                <UploadOutlined />
              </Fab>
            </Grid>
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

      {/* Título */}
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

      {/* Cuerpo */}
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

      {/* Botón eliminar */}
      <Grid container justifyContent="flex-end">
        <Button onClick={onDelete} color="error" startIcon={<DeleteOutline />}>
          Eliminar
        </Button>
      </Grid>

      {/* Galería */}
      <Grid>
        <ImageGallery images={note.imageUrls || []} />
      </Grid>
    </Grid>
  );
};
