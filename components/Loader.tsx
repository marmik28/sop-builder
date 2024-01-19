// components/Loader.tsx
import React from "react";
import "../app/globals.css";

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
