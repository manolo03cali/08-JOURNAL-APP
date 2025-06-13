// Importaciones necesarias para interactuar con Firestore (crear, eliminar, actualizar documentos)
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

// Importación de la configuración personalizada de Firebase (incluye FirebaseDB)
import { FirebaseDB } from "../../firebase/config";

// Importación de las acciones del slice de Redux que maneja el estado del journal
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
} from "./";

// Importación de funciones auxiliares (helpers)
import { fileUpload, loadNotes, setupNotesListener } from "../../helpers";

// Función que permite crear una nueva nota vacía y guardarla en el estado
export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNewNote()); // Actualiza el estado a "guardando"

    const { uid } = getState().auth; // Se obtiene el UID del usuario desde Redux

    // Se construye una nota vacía con la fecha actual
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
      imageUrls: [],
    };

    // Se crea la referencia a un nuevo documento Firestore dentro de la colección del usuario
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));

    // Se asigna el ID generado automáticamente por Firestore a la nueva nota
    newNote.id = newDoc.id;

    // Se actualiza el estado de Redux: se agrega la nota vacía y se marca como activa
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
    dispatch(savingComplete()); // Se indica que la operación de guardado ha terminado
  };
};

// Función que permite cargar todas las notas del usuario desde Firestore
export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth; // Se obtiene el UID del usuario

    if (!uid) throw new Error("El UID del usuario no existe"); // Validación

    // Se cargan las notas desde Firestore usando el helper
    const notes = await loadNotes(uid);

    // Se actualiza el estado global con las notas cargadas
    dispatch(setNotes(notes));
  };
};

// Función que guarda la nota activa (modificada) en Firestore
export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving()); // Marca el estado como "guardando"

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    // Se clona la nota y se elimina el id, ya que Firestore lo utiliza en la ruta
    const noteTofirestone = { ...note };
    delete noteTofirestone.id;

    // Se crea una referencia al documento específico en Firestore
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    // Se guarda la nota (con merge para no sobreescribir campos que no se están actualizando)
    await setDoc(docRef, noteTofirestone, { merge: true });

    // Se actualiza el estado con la nota guardada
    dispatch(noteUpdated(note));
  };
};

// Función que sube archivos (por ejemplo, imágenes) y los asocia a la nota activa
export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving()); // Se marca como "guardando"

    const fileUploadPromises = [];

    // Se crean promesas para subir cada archivo
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file)); // `fileUpload` devuelve la URL del archivo subido
    }

    // Espera a que todas las imágenes se suban
    const photosUrls = await Promise.all(fileUploadPromises);

    // Actualiza la nota activa con las URLs de las imágenes subidas
    dispatch(setPhotosActiveNote(photosUrls));
  };
};

//  Función que elimina la nota activa desde Firestore y del estado local
export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    // Se crea la referencia a la nota que se quiere eliminar
    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

    // Se elimina el documento desde Firestore
    await deleteDoc(docRef);

    // Se elimina la nota del estado local
    dispatch(deleteNoteById(note.id));
  };
};

//  Función que escucha en tiempo real los cambios de las notas del usuario en Firestore
export const startNotesListening = (uid) => {
  return (dispatch) => {
    // Inicia el listener usando el helper
    const unsubscribe = setupNotesListener(uid, (notes) => {
      dispatch(setNotes(notes)); // Cada vez que Firestore actualiza, se actualiza el estado global
    });

    return unsubscribe; // Se devuelve la función para detener el listener cuando sea necesario
  };
};
