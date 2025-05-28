// Importo el layout principal JournalLayout que me ayuda a estructurar toda la página
import { JournalLayout } from "../layout/JournalLayout";

// Importo dos vistas: una para cuando no hay ninguna nota seleccionada (NothingSelectedView)
// y otra para mostrar la nota activa cuando hay una seleccionada (NoteView)
import { NoteView, NothingSelectedView } from "../views";

// Importo el ícono de suma para usarlo en el botón de agregar nueva nota
import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";

// Importo hooks de Redux para obtener el estado y para despachar acciones
import { useDispatch, useSelector } from "react-redux";

// Importo la acción que crea una nueva nota en el store
import { startNewNote } from "../../store/journal";

// Importo useMemo para memorizar valores y evitar cálculos innecesarios
import { useMemo } from "react";

// Componente funcional principal que representa la página del diario
export const JournalPage = () => {
  // Extraigo del estado global si se está guardando (isSaving) y la nota activa (active)
  const { isSaving, active } = useSelector((state) => state.journal);
  // Obtengo la función dispatch para enviar acciones a Redux
  const dispatch = useDispatch();

  // Uso useMemo para guardar si se está guardando una nota, así no recalculo esto en cada render
  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  // Dependiendo si hay una nota activa, muestro la vista de la nota o la vista cuando no hay nada seleccionado
  const viewNote = !!active ? <NoteView /> : <NothingSelectedView />;

  // Función que despacha la acción para crear una nueva nota cuando hago click en el botón
  const onClickNewNote = () => {
    dispatch(startNewNote());
  };

  return (
    // Aquí uso el layout principal para envolver toda la página
    <JournalLayout>
      {/* Renderizo la vista correspondiente: la nota activa o nada seleccionado */}
      {viewNote}

      {/* Botón flotante (Floating Action Button) para agregar una nueva nota */}
      <Fab
        disabled={isSavingNote} // Deshabilito el botón si ya se está guardando una nota
        onClick={onClickNewNote} // Al hacer click, creo una nueva nota
        size="large" // Tamaño grande para mejor visibilidad
        sx={{
          color: "white", // Color del icono dentro del botón
          backgroundColor: "error.main", // Color rojo según tema, para resaltar el botón
          ":hover": { backgroundColor: "error.main", opacity: 0.9 }, // Efecto hover con opacidad
          position: "fixed", // Posiciono el botón fijo en pantalla para que siempre esté visible
          right: 50, // 50 píxeles desde el borde derecho
          bottom: 50, // 50 píxeles desde el borde inferior
        }}
      >
        {/* Icono de suma grande dentro del botón */}
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </JournalLayout>
  );
};
