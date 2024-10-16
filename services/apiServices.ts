import axios from "axios";
import { API_BASE_URL } from "./api_url";
import { getToken, refreshToken } from "./authService";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const access = await refreshToken();
        api.defaults.headers.common["Authorization"] = `Bearer ${access}`;
        return api(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const getContests = async () => {
  return await api.get("/contests/");
};

export const getContest = async (id: number) => {
  return await api.get(`/contests/${id}/`);
};

export const getContestWords = async (id: number) => {
  return await api.get(`/contests/${id}/words/`);
};

export const getContestRanking = async (id: number) => {
  return await api.get(`/contests/${id}/standings/`);
};

export const submitGuess = async (
  id: number,
  guess_text: string,
  word_position: string,
  word_id: number
) => {
  return await api.post(`/contests/${id}/submit_guess/`, {
    guess_text,
    word_position,
    word_id,
  });
};

export const registerContest = async (id: number) => {
  return await api.post(`/contests/${id}/register/`);
};

export const createContest = async (data: any) => {
  return await api.post("/contests/", data);
};

export const getGuesses = async (contest_id: number, word_id: number) => {
  return []
  return await api.get(`/contests/${contest_id}/get_word_guesses/`, {
    params: { word_id },
  });
};
