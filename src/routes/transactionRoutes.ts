import { Router } from 'express';
import { TransactionController } from '../controllers/transactionController';

const transactionController = new TransactionController();
const router = Router();

router.post('/transaction', transactionController.createTransaction);
router.get('/transaction/all', transactionController.allTransaction);
router.get('/transaction/user/:id', transactionController.getTransactionByUId);

export default router;