//import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
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

// Función para crear una nueva nota vacía
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

    // Creo una referencia para un nuevo documento en Firestore, dentro de la colección del usuario
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // Asigno el id generado por Firestore a la nota nueva
    newNote.id = newDoc.id;

    // Despacho acciones para agregar la nota vacía a mi estado y marcarla como activa
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    dispatch(savingComplete()); // Indico que ya terminé de guardar
  };
};

// Función para cargar todas las notas del usuario desde Firestore
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; // Obtengo el uid del usuario
    if (!uid) throw new Error("El UID del usuario no existe"); // Si no existe, lanzo error
    const notes = await loadNotes(uid); // Uso helper para traer las notas del usuario
    dispatch(setNotes(notes)); // Guardo las notas en el estado global
  };
};

// Función para guardar la nota activa actualizada en Firestore
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving()); // Indico que estoy guardando (loading)
    const { uid } = getState().auth; // Obtengo el uid del usuario
    const { active: note } = getState().journal; // Obtengo la nota activa

    // Clono la nota para preparar el objeto que voy a guardar y elimino el id para no duplicarlo en Firestore
    const noteTofirestone = { ...note };
    delete noteTofirestone.id;

    // Creo la referencia al documento específico de la nota en Firestore
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    // Guardo los cambios en Firestore, usando merge para no sobreescribir campos no incluidos
    await setDoc(docRef, noteTofirestone, { merge: true });

    // Despacho la acción para actualizar la nota en el estado local con la nota guardada
    dispatch(noteUpdated(note));
  };
};

// Función para subir archivos (imágenes) y asociarlos a la nota activa
export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving()); // Indico que estoy guardando (loading)
    // Creo un arreglo de promesas para subir todos los archivos simultáneamente
    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file)); // fileUpload es el helper que sube un archivo y devuelve la URL
    }
    // Espero que todas las subidas terminen y obtengo las URLs de las imágenes
    const photosUrls = await Promise.all(fileUploadPromises);

    // Despacho la acción para agregar las URLs de las imágenes a la nota activa
    dispatch(setPhotosActiveNote(photosUrls));
  };
};

// Función para eliminar la nota activa tanto de Firestore como del estado local
export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; // Obtengo el uid del usuario
    const { active: note } = getState().journal; // Obtengo la nota activa

    // Creo la referencia al documento de la nota que quiero eliminar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    // Borro la nota de Firestore
    await deleteDoc(docRef);

    // Despacho la acción para eliminar la nota del estado local
    dispatch(deleteNoteById(note.id));
  };
};
export const startNotesListening = (uid) => {
  return (dispatch) => {
    const unsubscribe = setupNotesListener(uid, (notes) => {
      dispatch(setNotes(notes)); // Actualiza el estado Redux
    });
    return unsubscribe; // Limpio el listener
  };
};
