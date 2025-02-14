import { Request, Response } from 'express';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

export class ItemController {
  

  async createItem(req: Request, res: Response) {
    try {
      const {  name, description, stock,price,special_price,images,unit,category,availability } = req.body;
      const item = await itemService.createItem( name, description, stock,price,special_price,images,unit,category,availability);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the item.' });
    }
  }
  

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {name, description, stock,price,special_price,images,unit,category,availability } = req.body;
      const item = await itemService.updateItem(id, name, description, stock,price,special_price,images,unit,category,availability);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the item.' });
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.getItemById(id);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'item not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the item.' });
    }
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const items = await itemService.getAllItems();
      res.json(items);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'An error occurred while retrieving items.' });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await itemService.deleteItem(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while removing the item.' });
    }
  }
}