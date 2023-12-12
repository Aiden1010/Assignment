import { memo } from "react";
import "./Character.css";

const Character = memo(({ name, image, status }) => {
  return (
    <div className="character-card">
      <img src={image} alt={name} />
      <div className="character-details">
        <h2>{name}</h2>
        <p>Status: {status}</p>
      </div>
    </div>
  );
});

export default Character;
