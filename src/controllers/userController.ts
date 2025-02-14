import { Request, Response } from 'express';
import { UserService } from '../services/userService';


const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { firstname,lastname,address,hometown, email, password } = req.body;
      const user = await userService.createUser(firstname,lastname,address,hometown, email, password);
      if(user){
        const { password, ...userWithoutPassword } = user;
        res.status(201).json(userWithoutPassword);
      }
      else{
        res.status(409).json("Email already exists");

      }
      
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  }

  async Updateitemcount(req: Request, res: Response) {  // update item count in cart
    try {
      console.log(req.body);
      const { id, itemid,itemcount } = req.body;
      
      const user = await userService.getUserById(id);
      // Exclude the password field from the user object
      if(user){
        const user_ = await userService.updatecart(user.id,itemid,itemcount)
        if (!user_){
          res.status(401).json({ error: 'Invalid User ID '});
        }
        else{
          const { password, ...userWithoutPassword } = user_;
          res.json(userWithoutPassword);
        }
      }
      else{
       res.status(401).json({ error: 'Invalid User ID' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while login.' });
    }
  }

  async removeItemsFromCart(req: Request, res: Response) {  // update item count in cart
    try {
      console.log(req.body);
      const { id, itemids} = req.body;
      
      const user = await userService.getUserById(id);
      // Exclude the password field from the user object
      if(user){
        const user_ = await userService.removeItemsFromCart(user.id,itemids)
        if (!user_){
          res.status(401).json({ error: 'Invalid Itemids' });
        }
        else{
          const { password, ...userWithoutPassword } = user_;
          res.json(userWithoutPassword);
        }
      }
      else{
       res.status(401).json({ error: 'Invalid User ID' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating.' });
    }
  }

  async resetcart(req: Request, res: Response){
    try{
      const{id} =req.body;
      const user = await userService.getUserById(id);
      if(user){
        const user_ = await userService.resetCart(user.id);
        if(user_){
          const { password, ...userWithoutPassword } = user_;
          res.json(userWithoutPassword);
        }
        else{
          res.status(401).json({ error: 'Invalid User ID' });
      }}
      else{
        res.status(401).json({ error: 'Invalid User ID' });
      }
    }
    catch (error) {
      res.status(500).json({ error: 'An error occurred while updating.' });
    }
    }

  async Login(req: Request, res: Response) { 
    try {
      const { email, password } = req.body;
      const user = await userService.login( email, password);
      // Exclude the password field from the user object
      if(user){
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      }
      else{
       res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error: any) {
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);
      if (user) {
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { firstname,lastname,address,hometown, email, password } = req.body;
      const user = await userService.updateUser(id, firstname,lastname,address,hometown, email, password);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(id);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  }
  
}