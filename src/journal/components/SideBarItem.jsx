import TurnedInNot from "@mui/icons-material/TurnedInNot";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useMemo } from "react";
import { setActiveNote } from "../../store/journal";
import { useDispatch } from "react-redux";
export const SideBarItem = ({ title = "", body, id, date, imageUrls = [] }) => {
  const dispatch = useDispatch();
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + "..." : title;
  }, [title]);

  const onClickNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };
  return (
    <>
      <ListItem disablePadding>
        {/* Botón clickeable que contiene el ícono y texto */}
        <ListItemButton onClick={onClickNote}>
          {/* Ícono en cada ítem */}
          <ListItemIcon>
            <TurnedInNot />
          </ListItemIcon>
          <Grid container>
            {/* Texto principal y secundario (una breve descripción) */}
            <ListItemText primary={newTitle} secondary={body} />
          </Grid>
        </ListItemButton>
      </ListItem>
    </>
  );
};
