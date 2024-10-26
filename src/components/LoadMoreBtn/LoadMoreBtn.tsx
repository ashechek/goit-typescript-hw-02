import React from "react";
import s from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMoreFu: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ loadMoreFu }) => {
  return (
    <div className={s.loadMoreDiv}>
      <button className={s.loadMoreBtn} onClick={loadMoreFu}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
