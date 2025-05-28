// Importo los componentes necesarios para crear una lista de imágenes desde Material-UI
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

// Creo el componente ImageGallery que recibe un array de URLs de imágenes llamado "images"
export const ImageGallery = ({ images }) => {
  // Retorno el componente ImageList que es un contenedor para mostrar las imágenes en forma de galería
  // Le paso estilos para que ocupe todo el ancho disponible y tenga una altura fija de 500px
  // También configuro que tenga 4 columnas y que cada fila mida 164px de alto
  return (
    <ImageList sx={{ width: "100%", height: 500 }} cols={4} rowHeight={164}>
      {/* Recorro el array de imágenes y por cada URL genero un ImageListItem */}
      {images.map((image) => (
        // Asigno la URL como key porque es única para cada imagen
        <ImageListItem key={image}>
          {/* Creo la etiqueta <img> para mostrar la imagen */}
          {/* Uso srcSet para imágenes en alta resolución (2x) para pantallas retina */}
          {/* El src normal es la imagen con un tamaño fijo de 164x164 píxeles y recortada para que encaje */}
          {/* Le pongo un texto alternativo simple "imagen" */}
          {/* Uso loading="lazy" para que la imagen se cargue solo cuando esté cerca de la pantalla, optimizando la carga */}
          <img
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            alt="imagen"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
