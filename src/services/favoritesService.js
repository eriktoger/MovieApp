import ENV_VARS from "../getEnv";

const { baseUrl } = ENV_VARS;

const getFavorites = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/favorites`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch {
    return { error: "Favorites could not be retrieved" };
  }
};

export const addFavorite = async (favorite, token) => {
  try {
    const response = await fetch(`${baseUrl}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: favorite.title, imdbID: favorite.imdbID }),
    });
    return await response.json();
  } catch {
    return { error: "Movie could not added to favorites" };
  }
};

export const removeFavorite = async (favorite, token) => {
  try {
    const response = await fetch(`${baseUrl}/favorites`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ title: favorite.title, imdbID: favorite.imdbID }),
    });
    return await response.json();
  } catch {
    return { error: "Movie could not be removed from favorites" };
  }
};

export default getFavorites;
