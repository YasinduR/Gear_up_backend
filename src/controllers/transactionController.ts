import { Request, Response } from 'express';
import { TransactionService } from '../services/transactionServices';
import { UserService } from '../services/userService';
import { ItemService } from '../services/itemService';

const transactionService = new TransactionService();
const itemService = new ItemService();
const userService = new UserService();

export class TransactionController {

  async createTransaction(req: Request, res: Response) {
    try {
      const { userid, amount, type, cart} = req.body;
      console.log(req.body);
      const trn = await transactionService.createTransaction(userid, amount, type, cart);
      if(userid){  // UPDATE USER CART WHEN ONLINE SHOPPING
        const itemIDS =cart.items.map((item: { id: Number; }) => item.id)
        console.log("Remove :",itemIDS);
        const updated_u = await userService.removeItemsFromCart(userid,itemIDS);
        console.log(updated_u);
      }
      if (trn) {
        for (const item of cart.items) {
          const existingItem = await itemService.getItemById(item.id);
          if (!existingItem) {
            throw new Error(`Item with ID ${item.id} not found`);
          }

          const newStock = existingItem.stock - item.quantity;
          if (newStock < 0) {
            throw new Error(`Insufficient stock for item ID ${item.id}`);
          } else {
            // Update the stock
            await itemService.updateItem(
              item.id, 
              existingItem.name, 
              existingItem.description, 
              newStock, 
              existingItem.price, 
              existingItem.special_price, 
              existingItem.images
            );
          }
        }}
      res.status(201).json(trn);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while logging the transaction.' });
    }
  }
  
  async getTransactionByUId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const trn = await transactionService.getTransactionByUId(id);
      if (trn) {
        res.json(trn);
      } else {
        res.status(404).json({ error: 'Transactions not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the Transactions.' });
    }
  }

  async allTransaction(req: Request, res: Response){
    try {
      const trns = await transactionService.getAllTransaction();
      if (trns) {
        res.json(trns);
      } else {
        res.status(404).json({ error: 'Transactions not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the Transactions.' });
    }
  }
}