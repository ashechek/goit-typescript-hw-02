import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  likes: number;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
}

interface ImageGalleryProps {
  galleryList: Image[];
  openModalFu: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  galleryList,
  openModalFu,
}) => {
  return (
    <ul className={s.galleryList}>
      {galleryList.map(({ id, likes, alt_description, urls: { regular, small } }) => (
        <li key={id} className={s.galleryCard}>
          <ImageCard
            id={id}
            likes={likes}
            smallImg={small}
            largeImg={regular}
            alt={alt_description}
            openModalFu={openModalFu}
          />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
