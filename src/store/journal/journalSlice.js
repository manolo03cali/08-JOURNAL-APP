import { createSlice } from "@reduxjs/toolkit";

// Creo el slice llamado "journal" que va a manejar todo el estado relacionado con las notas
export const journalSlice = createSlice({
  name: "journal",
  // Defino el estado inicial con las propiedades que necesito para las notas
  initialState: {
    isSaving: false, // Indica si estoy guardando una nota (para mostrar loading)
    messageSaved: "", // Mensaje que muestro cuando una nota se guarda o actualiza
    notes: [], // Aquí guardo todas las notas del usuario
    active: null, // Aquí guardo la nota que está activa (seleccionada) para mostrar/editar
    // Ejemplo de cómo sería la nota activa:
    // active: {
    //   id: "ABC123",
    //   title: "",
    //   body: "",
    //   date: 1234567,
    //   imageUrls: [], // arreglo con URLs de imágenes asociadas a la nota
    // },
  },
  reducers: {
    // Cuando empiezo a guardar una nota, pongo isSaving en true
    savingNewNote: (state) => {
      state.isSaving = true;
    },

    // Cuando termino de guardar, pongo isSaving en false
    savingComplete: (state) => {
      state.isSaving = false;
    },

    // Agrego una nueva nota vacía al arreglo de notas (payload trae la nota)
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
    },

    // Establezco la nota activa con la que voy a trabajar y limpio cualquier mensaje previo
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },

    // Establezco el arreglo completo de notas (por ejemplo, al cargar desde la base de datos)
    setNotes: (state, action) => {
      state.notes = action.payload;
    },

    // Indico que estoy guardando, y limpio mensajes guardados previos
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },

    // Actualizo una nota en el arreglo de notas (payload trae la nota actualizada)
    noteUpdated: (state, action) => {
      state.isSaving = false; // Ya terminé de guardar
      state.notes = state.notes.map((note) => {
        // Busco la nota que tiene el mismo id y la reemplazo por la actualizada
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      // Muestro mensaje de éxito con el título de la nota actualizada
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },

    // Agrego URLs de fotos a la nota activa, manteniendo las anteriores y poniendo isSaving en false
    setPhotosActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },

    // Limpio todo cuando hago logout: dejo todo como al principio
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },

    // Elimino una nota por su id (payload trae el id), además limpio la nota activa y pongo isSaving en false
    deleteNoteById: (state, action) => {
      state.isSaving = false;
      state.active = null;
      // Filtro las notas para eliminar la que tenga el id que me pasaron
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Exporto los action creators para poder usarlos en los dispatch
export const {
  addNewEmptyNote,
  deleteNoteById,
  setActiveNote,
  setNotes,
  setSaving,
  noteUpdated,
  savingNewNote,
  savingComplete,
  setPhotosActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
