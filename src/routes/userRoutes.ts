import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const router = Router();

router.post('/users', userController.createUser);
router.post('/users/login', userController.Login);
router.post('/users/cart', userController.Updateitemcount);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id',userController.deleteUser);

router.put('/users/cart/removeitems', userController.removeItemsFromCart);
router.put('/users/cart/reset', userController.resetcart);
export default router;