const API_URL = 'https://rickandmortyapi.com/api/character';

export const itemsService = {
  getAll: async (query = '') => {
    const url = query ? `${API_URL}?q=${query}` : API_URL;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    return response.json();
  },
};