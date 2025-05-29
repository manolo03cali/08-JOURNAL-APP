import { v2 as cloudinary } from "cloudinary";
import { fileUpload } from "../../helpers/fileUpload";
import { Segment } from "@mui/icons-material";
cloudinary.config({
  cloud_name: "cloudmanuel",
  api_key: "134625921855284",
  api_secret: "mPNoVz3iY7EJdbeXrAZ7m0M3NNo",
  secure: true,
});

describe("Pruebas en el helper fileUpload", () => {
  test("Debe de subir el archivo correctamente a cloudinary", async () => {
    const imageURL =
      "https://images.unsplash.com/photo-1748392242228-fe7ebd0b8a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8";

    const resp = await fetch(imageURL);
    const blob = await resp.blob();
    const file = new File([blob], "foto.jpg");
    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    const cloudResponse = await cloudinary.api.delete_resources([imageId], {
      resource_type: "image",
    });
    // console.log({ cloudResponse });
  });
  test("Debe de retornar null", async () => {
    const file = new File([], "foto.jpg");
    const url = await fileUpload(file);
    expect(url).toBe(null);
  });
});
