// Primero importo todo lo que necesito para construir mi página de diario
import { JournalLayout } from "../layout/JournalLayout"; // Este es el esqueleto de mi página
import { NoteView, NothingSelectedView } from "../views"; // Las dos vistas alternativas
import AddOutlined from "@mui/icons-material/AddOutlined"; // Ícono para mi botón
import Fab from "@mui/material/Fab"; // El componente de botón flotante
import { useDispatch, useSelector } from "react-redux"; // Para manejar el estado global
import { startNewNote, startNotesListening } from "../../store/journal"; // Mis acciones de Redux
import { useEffect, useMemo } from "react"; // Hooks esenciales de React

export const JournalPage = () => {
  // Aquí extraigo del estado global lo que necesito:
  const { isSaving, active } = useSelector((state) => state.journal); // Estado del diario
  const { uid } = useSelector((state) => state.auth); // ID del usuario
  const dispatch = useDispatch(); // Para despachar acciones

  // Configuro el listener para las notas en tiempo real
  useEffect(() => {
    let unsubscribe; // Guardaré la función para limpiar el listener

    const startListener = () => {
      if (uid) {
        // Solo si tengo un usuario autenticado
        unsubscribe = dispatch(startNotesListening(uid)); // Inicio el listener y guardo la función de limpieza
      }
    };

    startListener(); // Ejecuto la configuración inicial

    return () => {
      if (unsubscribe) unsubscribe(); // Limpio el listener cuando el componente se desmonta
    };
  }, [uid, dispatch]); // Se vuelve a ejecutar si cambia el uid o dispatch

  // Uso useMemo para optimizar, evitando recalculos innecesarios
  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  // Decido qué vista mostrar basado en si hay una nota activa
  const viewNote = !!active ? <NoteView /> : <NothingSelectedView />;

  // Esta función se ejecuta al hacer click en el botón de nueva nota
  const onClickNewNote = () => {
    dispatch(startNewNote()); // Despacho la acción para crear una nota
  };

  // Finalmente, devuelvo la estructura de mi página
  return (
    <JournalLayout>
      {/* Muestro la vista correspondiente según el estado */}
      {viewNote}

      {/* Botón flotante para agregar nuevas notas */}
      <Fab
        disabled={isSavingNote} // Lo desactivo mientras se guarda
        onClick={onClickNewNote}
        size="large"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ":hover": { backgroundColor: "error.main", opacity: 0.9 },
          position: "fixed",
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </JournalLayout>
  );
};
