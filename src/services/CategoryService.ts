import prisma from '../database/prisma';

class CategoryService {
  async getAll() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async create(name: string) {
    return prisma.category.create({
      data: { name },
    });
  }

  async delete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  }
}

export default new CategoryService();
