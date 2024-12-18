import axios from "axios";
import { API_BASE_URL } from "./api_url";
const TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const isBrowser = typeof window !== "undefined";

export const signup = async (
  username: string,
  password: string,
  email: string
) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register/`, {
      username,
      password,
      email,
    });
    const { refresh, access } = response.data;
    if (isBrowser) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
      localStorage.setItem(TOKEN_KEY, access);
    }
    return { refresh, access };
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login/`, {
      username,
      password,
    });
    const { refresh, access } = response.data;
    if (isBrowser) {
      localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
      localStorage.setItem(TOKEN_KEY, access);
    }
    return { refresh, access };
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

export const logout = () => {
  if (isBrowser) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

export const getToken = () => {
  if (isBrowser) {
    return localStorage.getItem(TOKEN_KEY);
  } else {
    return null;
  }
};

export const getRefreshToken = () => {
  try {
    if (isBrowser) {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    }
  } catch (error) {
    return null;
  }
};

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) {
    throw new Error("No refresh token available");
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/login/refresh/`, {
      refresh,
    });
    const { access } = response.data;
    if (isBrowser) {
      localStorage.setItem(TOKEN_KEY, access);
    }
    return access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    throw error;
  }
};
