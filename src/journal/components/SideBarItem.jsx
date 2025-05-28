// Importo un ícono de Material UI para mostrar en cada ítem del sidebar
import TurnedInNot from "@mui/icons-material/TurnedInNot";

// Importo componentes de Material UI para construir el ítem de la lista
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Importo useMemo para memorizar valores y evitar cálculos innecesarios
import { useMemo } from "react";

// Importo la acción setActiveNote para marcar una nota como activa en el estado global
import { setActiveNote } from "../../store/journal";

// Importo useDispatch para poder disparar acciones en Redux
import { useDispatch } from "react-redux";

// Defino el componente SideBarItem que recibe props con la info de una nota
export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  // Obtengo el dispatch para poder enviar acciones
  const dispatch = useDispatch();

  // Uso useMemo para crear un título corto si es muy largo, así evito recalcularlo en cada render
  const newTitle = useMemo(() => {
    // Si el título tiene más de 17 caracteres, corto y agrego "..."
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  // Función que se ejecuta al hacer click sobre el ítem
  const onClickNote = () => {
    // Despacho la acción setActiveNote con toda la info de la nota para marcarla como activa
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };

  return (
    <>
      {/* ListItem sin padding para ajustar mejor */}
      <ListItem disablePadding>
        {/* Botón que abarca todo el ítem y es clickeable */}
        <ListItemButton onClick={onClickNote}>
          {/* Aquí pongo el ícono a la izquierda */}
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          {/* Uso Grid para organizar el texto */}
          <Grid container>
            {/* Pongo el título (ya cortado si era muy largo) y el cuerpo como texto secundario */}
            <ListItemText primary={newTitle} secondary={body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};
