import { collection, deleteDoc, doc, setDoc } from "firebase/firestore"; // Importo funciones para interactuar con Firestore
import { FirebaseDB } from "../../firebase/config"; // Importo mi configuración de Firestore
import {
  addNewEmptyNote,
  noteUpdated,
  savingComplete,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  setPhotosActiveNote,
  deleteNoteById,
} from "./"; // Importo los actions del journalSlice
import { fileUpload, loadNotes, setupNotesListener } from "../../helpers"; // Importo helpers para subir archivos y cargar notas

// Función para crear una nueva nota
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote()); // Indico que estoy guardando (loading)
    const { uid } = getState().auth; // Obtengo el id del usuario desde el estado global

    // Creo un objeto de nota nueva con datos vacíos y la fecha actual
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };
    try {
      // Creo una referencia para un nuevo documento en Firestore, dentro de la colección del usuario
      const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
      console.log("Guardando nota en Firestore:", newNote);
      await setDoc(newDoc, newNote);
      console.log("Nota guardada con ID:", newDoc.id);
      // Asigno el id generado por Firestore a la nota nueva
      newNote.id = newDoc.id;

      // Despacho acciones para agregar la nota vacía a mi estado y marcarla como activa
      dispatch(addNewEmptyNote(newNote));
      dispatch(setActiveNote(newNote));
      dispatch(savingComplete()); // Indico que ya terminé de guardar
    } catch (error) {
      console.error("Error en startNewNote:", error);
      throw error;
    }
  };
};
