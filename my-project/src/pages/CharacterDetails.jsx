import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCharacterById } from "../services/charactersService";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/CharacterDetails.css";

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorBox message={error} />;
  if (!character) return <p>Character not found.</p>;

  return (
    <div className="character-details">
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p><b>Status:</b> {character.status}</p>
      <p><b>Species:</b> {character.species}</p>
      <p><b>Gender:</b> {character.gender}</p>
      <p><b>Origin:</b> {character.origin?.name}</p>
      <p><b>Location:</b> {character.location?.name}</p>
      <p><b>Episodes:</b> {character.episode.length}</p>

      <button onClick={() => navigate(-1)}>← Back</button>
    </div>
  );
}
