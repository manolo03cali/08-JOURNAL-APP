// Importo el thunk que quiero testear, el que se encarga de crear una nueva nota
import { startNewNote } from "../../../store/journal/thunks";

// Simulo (mockeo) completamente las funciones de Firestore que mi thunk podría estar usando
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),

  // Cuando llamo a collection(db, path), devuelvo un objeto con db y path para simular la referencia a la colección
  collection: jest.fn((db, path) => ({
    db,
    path,
  })),

  // Cuando llamo a doc(), devuelvo un objeto que simula un documento de Firestore con un ID mockeado
  doc: jest.fn((collectionRef) => ({
    id: "MOCK-NOTE-ID",
    collectionRef,
  })),

  // Simulo que la función setDoc() se resuelve correctamente (como si hubiera guardado la nota sin errores)
  setDoc: jest.fn(() => Promise.resolve()),

  // Aquí puedo agregar más funciones de Firestore si las uso en mis thunks
}));

// También simulo la parte de autenticación de Firebase
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: "TEST-UID" }, // Simulo que tengo un usuario autenticado
  })),

  signInWithEmailAndPassword: jest.fn(
    () => Promise.resolve({ user: { uid: "TEST-UID" } }) // Simulo login exitoso
  ),
}));

// Mockeo también la configuración de Firebase (FirebaseDB y FirebaseAuth) aunque no se usen directamente en este test
jest.mock("../../../firebase/config", () => ({
  FirebaseDB: {},
  FirebaseAuth: {},
}));

// Inicio el bloque de pruebas
describe("Pruebas en Journal Thunks", () => {
  // Simulo las funciones dispatch y getState que Redux me da
  const dispatch = jest.fn();

  // Simulo el estado que devuelve getState() cuando lo llamo desde el thunk
  const getState = jest.fn(() => ({
    auth: {
      uid: "TEST-UID", // Simulo que el usuario ya está autenticado
      status: "authenticated",
    },
  }));

  // Limpio todos los mocks antes de cada prueba para evitar interferencias
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Aquí hago mi prueba principal
  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    // Llamo al thunk con dispatch y getState simulados
    await startNewNote()(dispatch, getState);

    // Verifico que el thunk haya hecho dispatch de la acción de "savingNewNote"
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "journal/savingNewNote" })
    );

    // Verifico que haya hecho dispatch de la acción para agregar una nota vacía
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: "journal/addNewEmptyNote",
        payload: {
          id: expect.any(String), // No me importa qué ID, pero espero que haya uno
          title: "", // Título vacío
          body: "", // Cuerpo vacío
          date: expect.any(Number), // Cualquier timestamp
          imageUrls: [], // Lista vacía de imágenes
        },
      })
    );
  });
});
