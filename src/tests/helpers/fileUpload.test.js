// Importo Cloudinary en su versión 2 (v2) para poder configurarlo y usar su API
import { v2 as cloudinary } from "cloudinary";

// Importo mi función personalizada fileUpload, que me ayuda a subir archivos
import { fileUpload } from "../../helpers/fileUpload";

// Esto parece innecesario aquí, pero puede que se use en otro contexto (lo dejo por ahora)
import { Segment } from "@mui/icons-material";

// Configuro Cloudinary con mis credenciales para que pueda autenticar las peticiones
cloudinary.config({
  cloud_name: "cloudmanuel", // Nombre de mi cuenta de Cloudinary
  api_key: "134625921855284", // Clave pública
  api_secret: "mPNoVz3iY7EJdbeXrAZ7m0M3NNo", // Clave privada (¡esta debería mantenerse segura!)
  secure: true, // Me aseguro de usar HTTPS
});

// Comienzo a describir el bloque de pruebas para la función fileUpload
describe("Pruebas en el helper fileUpload", () => {
  // Primera prueba: quiero asegurarme de que el archivo se suba correctamente a Cloudinary
  test("Debe de subir el archivo correctamente a cloudinary", async () => {
    // Uso una imagen de Unsplash como prueba (es una URL de imagen pública)
    const imageURL =
      "https://images.unsplash.com/photo-1748392242228-fe7ebd0b8a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8";

    // Hago una petición HTTP para obtener esa imagen
    const resp = await fetch(imageURL);

    // Convierto la respuesta en un blob (objeto binario)
    const blob = await resp.blob();

    // A partir del blob, creo un objeto File que simula una imagen subida por el usuario
    const file = new File([blob], "foto.jpg");

    // Llamo a la función fileUpload para subir esta imagen a Cloudinary
    const url = await fileUpload(file);

    // Verifico que lo que me devuelve sea una URL (tipo string)
    expect(typeof url).toBe("string");

    // Si todo salió bien, la imagen se subió, así que ahora la elimino para no saturar mi cuenta
    // Extraigo el ID de la imagen desde la URL
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");

    // Llamo a Cloudinary para eliminar la imagen que acabo de subir (buena práctica en pruebas)
    const cloudResponse = await cloudinary.api.delete_resources([imageId], {
      resource_type: "image",
    });

    // Si quiero, puedo imprimir la respuesta de Cloudinary para revisar qué pasó
    // console.log({ cloudResponse });
  });

  // Segunda prueba: quiero ver qué pasa si subo un archivo vacío
  test("Debe de retornar null", async () => {
    // Creo un archivo sin contenido (simula una imagen vacía o fallida)
    const file = new File([], "foto.jpg");

    // Intento subirlo con fileUpload
    const url = await fileUpload(file);

    // Espero que la función no suba nada y me devuelva null
    expect(url).toBe(null);
  });
});
