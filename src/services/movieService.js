import ENV_VARS from "../getEnv";

const { baseUrl } = ENV_VARS;

export const getMovie = async (title, token) => {
  try {
    const response = await fetch(`${baseUrl}/movie/${title}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await response.json();
  } catch {
    return { error: "Movie search failed" };
  }
};
