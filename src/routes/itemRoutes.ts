import { Router } from 'express';
import { ItemController } from '../controllers/itemController';

const itemController = new ItemController();
const router = Router();

router.post('/items', itemController.createItem);
router.get('/items/:id', itemController.getItemById);
router.get('/items', itemController.getAllItems);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

export default router;