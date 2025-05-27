import { createSlice } from "@reduxjs/toolkit";

export const journalSlice = createSlice({
  name: "journal",
  initialState: {
    isSaving: false,
    messageSaved: "",
    notes: [],
    active: null,
    //Como se va a ver la nota activa
    // active: {
    //   id: "ABC123",
    //   title: "",
    //   body: "",
    //   date: 1234567,
    //   imageUrls: [], //https://foto1.jpg, https://foto2.jpg
    // },
  },
  reducers: {
    savingNewNote: (state) => {
      state.isSaving = true;
    },
    savingComplete: (state) => {
      state.isSaving = false;
    },
    addNewEmptyNote: (state, action) => {
      state.notes.push(action.payload);
    },
    setActiveNote: (state, action) => {
      state.active = action.payload;
      state.messageSaved = "";
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSaved = "";
    },
    noteUpdated: (state, action) => {
      //payload : note
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });
      state.messageSaved = `${action.payload.title}, actualizada correctamente`;
    },
    setPhotosActiveNote: (state, action) => {
      state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSaved = "";
      state.notes = [];
      state.active = null;
    },
    deleteNoteById: (state, action) => {
      state.isSaving = false;
      state.active = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

//Action creators are generated for each case reducer function
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
