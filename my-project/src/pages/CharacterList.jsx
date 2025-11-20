import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchCharacters } from "../services/charactersService";
import CharacterCard from "../components/CharacterCard";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "../styles/CharactersList.css";

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const data = await searchCharacters(query);
        setCharacters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    load();
  }, [query]);

  return (
    <div className="characters-list">
      <h1>Characters</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setSearchParams({ q: e.target.value })}
        placeholder="Search characters..."
      />
      {loading && <Spinner />}
      {error && <ErrorBox message={error} />}
      <div className="list-grid">
        {characters.map((c) => (
          <CharacterCard key={c.id} character={c} />
        ))}
      </div>
    </div>
  );
}
