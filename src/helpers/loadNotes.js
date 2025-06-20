// Importo las funciones necesarias desde Firestore (versión lite)
//import { collection, getDocs, query } from "firebase/firestore/lite";
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
// Importo mi instancia de la base de datos que ya configuré en firebase/config
import { FirebaseDB } from "../firebase/config";

// Esta es una función asíncrona que uso para cargar las notas del usuario
export const loadNotes = async (uid = "") => {
  // Primero me aseguro de que me hayan pasado un UID (identificador único del usuario)
  if (!uid) throw new Error("El UID del usuario no existe");

  // Creo una referencia a la colección de notas del usuario usando su UID
  // Firebase organiza los datos como si fueran carpetas, y aquí accedo a: usuario/journal/notes
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  // Obtengo todos los documentos (notas) dentro de esa colección
  const docs = await getDocs(collectionRef);

  // Inicializo un arreglo vacío donde voy a ir guardando las notas una por una
  const notes = [];

  // Recorro cada documento que obtuve
  docs.forEach((doc) => {
    // Extraigo los datos de cada documento y le agrego su ID
    notes.push({ id: doc.id, ...doc.data() });
  });

  // Devuelvo el arreglo con todas las notas
  return notes;
};

// función para escuchar cambios en tiempo real
export const setupNotesListener = (uid, callback) => {
  if (!uid) throw new Error("UID no proporcionado");

  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
  const q = query(collectionRef);

  // Retornamos el unsubscribe para poder limpiarlo después
  return onSnapshot(q, (snapshot) => {
    const notes = [];
    snapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() });
    });
    callback(notes); // Ejecuto el callback con las nuevas notas
  });
};
