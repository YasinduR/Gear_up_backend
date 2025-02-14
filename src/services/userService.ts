import { UserRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';


const userRepository = new UserRepository();

export class UserService {
  
  async createUser(firstname: string, lastname: string, address: string,hometown: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10); 
    
    return userRepository.createUser({
      firstname,
      lastname,
      address,
      hometown,
      email,
      password:hashedPassword, // Ensure password is hashed if required
    });

  }

  async removeItemsFromCart(id: string, itemIds: number[]){
    return userRepository.removeItemsFromCart(id,itemIds);
  }

  
  async resetCart(id: string){
    return userRepository.resetCart(id);
  }
  async getUserById(id: string) {
    return userRepository.getUserById(id);
  }

  async login(email: string, password: string) {
    // Fetch the user from the database by email (assuming userRepository is implemented correctly)
    const user = await userRepository.getUserByEmail(email);
  
    if (!user) {
      throw new Error('User not found');
    }
  
    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    else{
      return user;
    }


  }



  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async updatecart(id: string, itemid: string, itemcount: number ){ //UPDATE CART
    return userRepository.updatecart(id,itemid,itemcount);
  }

  async updateUser(id: string, firstname?: string, lastname?: string, address?: string,hometown?: string, email?: string, password?: string,cart? :JSON) {
    // You might want to hash the password here
    return userRepository.updateUser(id, { firstname,lastname,address,hometown, email, password,cart  });
  }

  async deleteUser(id: string) {
    return userRepository.deleteUser(id);
  }
    

}
