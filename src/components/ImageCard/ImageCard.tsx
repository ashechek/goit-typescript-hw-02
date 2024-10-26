import React from "react";
import s from "./ImageCard.module.css";

interface ImageCardProps {
  id: string;
  likes: number;
  smallImg: string;
  largeImg: string;
  alt: string;
  openModalFu: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({
  id,
  likes,
  smallImg,
  largeImg,
  alt,
  openModalFu,
}) => {
  return (
    <div key={id} className={s.cardDiv}>
      <img
        src={smallImg}
        alt={alt}
        className={s.cardImg}
        onClick={() => openModalFu(largeImg)}
      />
      <span className={s.cardDesc}>
        <p className={s.cardDescItem}>Likes: {likes}</p>
        <p className={s.cardDescItem}>{alt}</p>
      </span>
    </div>
  );
};

export default ImageCard;
