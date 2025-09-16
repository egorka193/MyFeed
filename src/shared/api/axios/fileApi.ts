
import axios, { type AxiosProgressEvent } from "axios";
import { store } from "@/shared/store/store";

const api = axios.create({
  baseURL: "/api", 
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth?.token; 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fileApi = {
  getUploadLink: async (fileName: string, category: "AVATARS" | "POSTS") => {
    return api.get<string>(
      `/v1/aws/signed-url?fileName=${fileName}&fileCategory=${category}`
    );
  },

  uploadImage: async (link: string, data: Blob, onProgress?: (e: AxiosProgressEvent) => void) => {
    return axios.put(link, data, {
      headers: { "Content-Type": data.type },
      onUploadProgress: onProgress,
    });
  },

  deleteImage: async (fileKey: string, category: "AVATARS" | "POSTS") => {
    return api.delete<void>(
      `/v1/aws/delete-s3-file?fileKey=${fileKey}&fileCategory=${category}`
    );
  },
};
