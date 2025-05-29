// Exporto la función fileUpload para poder usarla en otras partes del proyecto
export const fileUpload = async (file) => {
  // Primero verifico si me pasaron un archivo; si no, lanzo un error
  //if (!file) throw new Error("No existe archivo a subir");
  if (!file) return null;

  // Esta es la URL del endpoint de Cloudinary a donde voy a subir la imagen
  const cloudUrl = "https://api.cloudinary.com/v1_1/cloudManuel/upload";

  // Creo una nueva instancia de FormData para enviar el archivo y los datos necesarios
  const formData = new FormData();

  // Agrego el preset de configuración que tengo configurado en mi cuenta de Cloudinary
  formData.append("upload_preset", "react-journal");

  // Agrego el archivo que quiero subir
  formData.append("file", file);

  try {
    // Envío la petición a Cloudinary usando fetch. Es una solicitud POST con el FormData como cuerpo
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    // Verifico si la respuesta no fue exitosa. Si no lo fue, lanzo un error
    if (!resp.ok) throw new Error("No se pudo subir la imagen");

    // Si todo salió bien, convierto la respuesta a JSON para poder acceder a los datos
    const cloudResp = await resp.json();

    // Devuelvo solo la URL segura de la imagen subida para poder usarla después
    return cloudResp.secure_url;
  } catch (error) {
    // Si algo falla en todo este proceso, capturo el error y lo vuelvo a lanzar con su mensaje
    //throw new Error(error.message);
    return null;
  }
};
