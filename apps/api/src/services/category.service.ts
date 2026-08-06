import categoryRepository from "../repositories/category.repository";

class CategoryService {
  async getAll() {
    return categoryRepository.findAll();
  }
}

export default new CategoryService();