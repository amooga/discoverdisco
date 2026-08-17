import categoryRepository from "../repositories/category.repository.js";

class CategoryService {
  async getAll() {
    return categoryRepository.findAll();
  }
}

export default new CategoryService();