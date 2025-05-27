// Importa el componente IconButton desde la librería de componentes Material UI.
//import IconButton from "@mui/material/IconButton";

// Importa un componente de layout personalizado que probablemente define la estructura general de la página del diario.
import { JournalLayout } from "../layout/JournalLayout";

// Importa dos vistas posibles dentro del diario: una cuando no hay nada seleccionado y otra cuando se está viendo una nota.
import { NoteView, NothingSelectedView } from "../views";

// Importa un ícono de Material UI que representa un signo de suma encerrado en un círculo, usado normalmente para agregar algo nuevo.
import AddOutlined from "@mui/icons-material/AddOutlined";
import Fab from "@mui/material/Fab";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../store/journal";
import { useMemo } from "react";

// Componente funcional que representa la página principal del diario.
export const JournalPage = () => {
  const { isSaving, active } = useSelector((state) => state.journal);
  const dispatch = useDispatch();
  const isSavingNote = useMemo(() => isSaving === true, [isSaving]);

  const viewNote = !!active ? <NoteView /> : <NothingSelectedView />;

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    // Usa el layout del diario como contenedor principal de la página.
    <JournalLayout>
      {viewNote}

      {/* Botón flotante (FAB - Floating Action Button) para agregar una nueva nota. 
          Está posicionado en la parte inferior derecha de la pantalla. */}
      <Fab
        disabled={isSavingNote}
        onClick={onClickNewNote}
        size="large" // Tamaño grande del botón
        sx={{
          color: "white", // Color del ícono blanco
          backgroundColor: "error.main", // Color de fondo del botón (usualmente rojo, según el tema)
          ":hover": { backgroundColor: "error.main", opacity: 0.9 }, // Estilo al pasar el mouse
          position: "fixed", // Posición fija en la pantalla
          right: 50, // A 50px del borde derecho
          bottom: 50, // A 50px del borde inferior
        }}
      >
        {/* Ícono de suma dentro del botón, con tamaño 30px */}
        <AddOutlined sx={{ fontSize: 30 }} />
      </Fab>
    </JournalLayout>
  );
};
