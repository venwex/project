import { Link } from "react-router-dom";
import "../styles/CharacterCard.css";

export default function CharacterCard({ character }) {
  return (
    <div className="character-card">
      <img src={character.image} alt={character.name} />
      <h3>{character.name}</h3>
      <p>{character.species}</p>
      <Link to={`/items/${character.id}`}>View Details →</Link>
    </div>
  );
}
