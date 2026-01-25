
import { Request, Response } from 'express';
import SalesService from '../services/SalesService';

class SalesController {
  async index(req: Request, res: Response) {
    try {
      const filters = req.query;
      const result = await SalesService.getAll(filters);
      return res.json({ 
        data: result.data, 
        total: result.total 
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const sale = await SalesService.getById(id);
      if (!sale) return res.status(404).json({ error: 'Sale not found' });
      return res.json(sale);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const sale = await SalesService.create(req.body);
      return res.status(201).json(sale);
    } catch (error) {
      return res.status(400).json({ error: 'Bad Request' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const sale = await SalesService.update(id, req.body);
      return res.json(sale);
    } catch (error) {
      return res.status(400).json({ error: 'Error updating sale' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await SalesService.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: 'Error deleting sale' });
    }
  }

  async categories(req: Request, res: Response) {
    try {
      const categories = await SalesService.getCategories();
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new SalesController();
