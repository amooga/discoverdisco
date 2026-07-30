import { mockAdvertisements } from "../data/advertisements";
import type { Advertisement } from "../types/advertisement";

class AdvertisementService {
  private advertisements = [...mockAdvertisements];

  getAll(): Advertisement[] {
    return this.advertisements;
  }

  getById(id: string): Advertisement | undefined {
    return this.advertisements.find(ad => ad.id === id);
  }

  create(advertisement: Advertisement) {
    this.advertisements.unshift(advertisement);
    return advertisement;
  }

  update(id: string, updated: Partial<Advertisement>) {
    const index = this.advertisements.findIndex(ad => ad.id === id);

    if (index === -1) return null;

    this.advertisements[index] = {
      ...this.advertisements[index],
      ...updated,
    };

    return this.advertisements[index];
  }

  delete(id: string) {
    this.advertisements = this.advertisements.filter(
      ad => ad.id !== id
    );
  }
}

export default new AdvertisementService();