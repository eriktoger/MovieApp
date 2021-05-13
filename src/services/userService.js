import ENV_VARS from "../getEnv";

const { baseUrl } = ENV_VARS;

export const login = async (name, password) => {
  try {
    const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    return await response.json();
  } catch {
    return { error: "Login failed" };
  }
};

export const createAccount = async (name, password) => {
  try {
    const response = await fetch(`${baseUrl}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
    });

    return await response.json();
  } catch {
    return { error: "Account could not be created" };
  }
};
