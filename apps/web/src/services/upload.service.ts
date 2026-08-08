import api from "./api";

export interface UploadResponse {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
}

class UploadService {
  async upload(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    const response = await api.post(
      "/uploads",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data as UploadResponse;
  }
}

export default new UploadService();