import React from "react";
import toast from "react-hot-toast";
import s from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (topic: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const topic = form.elements.namedItem("topic") as HTMLInputElement;

    if (topic.value.trim() === "") {
      toast.error("Write some text!");
      return;
    } else if (topic.value.length < 3) {
      toast.error("The number of characters must be at least three!");
      return;
    }

    onSubmit(topic.value);
    form.reset();
  };

  return (
    <header className={s.header}>
      <form onSubmit={handlerSubmit} className={s.form}>
        <input
          name="topic"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={s.input}
        />
        <button type="submit" className={s.button}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
