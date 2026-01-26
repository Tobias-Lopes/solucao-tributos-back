import prisma from '../database/prisma';

export interface SalesFilters {
  productName?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  page?: string;
  pageSize?: string;
}

class SalesService {
  async getAll(filters: SalesFilters) {
    const { productName, categoryId, startDate, endDate, page, pageSize } = filters;
    
    const pageNum = parseInt(page || '1');
    const limit = parseInt(pageSize || '10');
    const skip = (pageNum - 1) * limit;

    const where: any = {};

    if (productName) {
      where.productName = { contains: productName };
    }

    if (categoryId) {
      where.categoryId = parseInt(categoryId);
    }

    if (startDate || endDate) {
      where.saleDate = {};
      if (startDate) where.saleDate.gte = new Date(startDate);
      if (endDate) where.saleDate.lte = new Date(endDate);
    }

    const [data, total] = await Promise.all([
      prisma.sale.findMany({
        where,
        include: { category: true },
        orderBy: { saleDate: 'desc' },
        skip: skip,
        take: limit,
      }),
      prisma.sale.count({ where })
    ]);

    return { data, total };
  }

  async create(data: { productName: string; categoryId: number; quantity: number; totalValue: number; saleDate?: string }) {
    return prisma.sale.create({
      data: {
        productName: data.productName,
        quantity: data.quantity,
        totalValue: data.totalValue,
        categoryId: data.categoryId,
        saleDate: data.saleDate ? new Date(data.saleDate) : new Date(),
      },
      include: { category: true }
    });
  }

  async getById(id: number) {
    return prisma.sale.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  async update(id: number, data: any) {
    const updateData = { ...data };
    if (updateData.saleDate) {
      updateData.saleDate = new Date(updateData.saleDate);
    }
    return prisma.sale.update({
      where: { id },
      data: updateData,
      include: { category: true }
    });
  }

  async getCategories() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async delete(id: number) {
    return prisma.sale.delete({ where: { id } });
  }
}

export default new SalesService();
