import { mockBusinesses } from "../data/businesses";

class BusinessService {
  private businesses = [...mockBusinesses];

  getAll() {
    return this.businesses;
  }

  getById(id: string) {
    return this.businesses.find(
      business => business.id === id
    );
  }
}

export default new BusinessService();