import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home">
      <h1>Welcome to Rick & Morty Explorer</h1>
      <p>
        Browse through all characters from the Rick and Morty universe.
        You can search by name and view detailed profiles of your favorites.
      </p>
      <img
        src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
        alt="Rick Sanchez"
      />
    </div>
  );
}
