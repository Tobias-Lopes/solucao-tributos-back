import CategoryService from '../services/CategoryService';
import { Request, Response } from 'express';

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getAll();
      return res.json(categories);
    } catch (error) {
console.log('ERROR', error);
      return res.status(500).json({ error: 'Erro ao buscar categorias' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Nome é obrigatório' });
      const category = await CategoryService.create(name);
      return res.status(201).json(category);
    } catch (error) {
console.log('ERROR', error);
      return res.status(400).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await CategoryService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Não é possível deletar categoria com vendas associadas' });
    }
  }
}

export default new CategoryController();
