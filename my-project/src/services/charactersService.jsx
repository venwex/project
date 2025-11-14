const API_BASE = "https://rickandmortyapi.com/api/character";

export async function searchCharacters(query = "") {
  const url = query ? `${API_BASE}/?name=${query}` : API_BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch characters");
  const data = await res.json();
  return data.results;
}

export async function getCharacterById(id) {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Character not found");
  return await res.json();
}
