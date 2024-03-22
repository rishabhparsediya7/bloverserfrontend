import axios from "axios";

const createAxiosInstance = (accessToken) => {
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return api;
};

export default createAxiosInstance;
