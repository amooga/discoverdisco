import api from "./api";

class BusinessService {
  async updateLocation(
    latitude: number,
    longitude: number
  ) {
    const response = await api.patch(
      "/businesses/location",
      {
        latitude,
        longitude,
      }
    );

    return response.data.data;
  }

  async getMe() {
    const response = await api.get(
      "/businesses/me"
    );

    return response.data.data;
  }
}

export default new BusinessService();