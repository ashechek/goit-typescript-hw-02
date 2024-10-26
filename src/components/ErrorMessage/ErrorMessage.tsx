import React from "react";
import s from "./ErrorMessage.module.css";

const ErrorMessage: React.FC = () => {
  return (
    <div className={s.errorDiv}>
      <p className={s.errorMessage}>Something went wrong! Try again...</p>
    </div>
  );
};

export default ErrorMessage;
