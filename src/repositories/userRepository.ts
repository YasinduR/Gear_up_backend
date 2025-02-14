import { Prisma, PrismaClient, User,Item } from '@prisma/client';


const prisma = new PrismaClient();

export class UserRepository {
  async createUser(data: { firstname: string; lastname: string; address: string; hometown: string ;email: string; password: string  }): Promise<User | null> {
    
    const email = data.email.toLowerCase();
    
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
  
    if (existingUser) {
      // Email already exists
      console.log("Email already exists");
      return null;
    }
  
    return prisma.user.create({
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        hometown: data.hometown,
        email:email, 
        password: data.password,
      },
    });
  }

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email: email.toLowerCase()},
    });
  }

  async removeItemsFromCart(id: string, itemIds: number[]) { // Remove Items from usercarts after succsessfull purchase

    const user = await prisma.user.findUnique({
      where: { id }
    });
  
    if (user && user.cart) {
      // Copy the current cart items
      let updatedCart = user.cart as Array<{ itemid: number; itemcount: number }>;
  
      // Filter out items with itemids that are in the itemIds array
      updatedCart = updatedCart.filter(item => !itemIds.includes(item.itemid));
  
      // Update the user's cart in the database
      return prisma.user.update({
        where: { id },
        data: {
          cart: updatedCart,
        },
      });
    } else {
      // No cart exists or invalid user
      return null;
    }
  }

  async resetCart(id: string) { // reset cart by userID
    const user = await prisma.user.findUnique({
      where: { id }
    });
    if (user) {
      return prisma.user.update({
        where: { id },
        data: {
          cart: [],
        },
      });
    } else {
      return null;
    }
  }

  async updatecart(id: string,  itemid: string, itemcount: number ) {
    
    const product = await prisma.item.findUnique({
      where: { id: itemid}
    }); 
    // Update only if valid product ID
    if(product){
      // Fetch the current cart of the user
    const user = await prisma.user.findUnique({
      where: { id }
    });
    let updatedCart = [];
    const newItem = {itemid: itemid, itemcount: itemcount};
    console.log(newItem)
    if (user && user.cart) {
      // If a cart exists, copy its contents
      updatedCart = user.cart as Array<{ itemid: string; itemcount: number }>;
      // Check if the item already exists in the cart
      const itemIndex = updatedCart.findIndex((item) => item.itemid === itemid);
      
      if (itemIndex > -1) {
        // Item exists, replace it with the new one
        updatedCart[itemIndex] = newItem;

      } else {
        // Item does not exist, add it to the cart
        updatedCart.push(newItem);
        //console.log(newItem)
      }
    } else {
      // If no cart exists, start a new one with the new item
      updatedCart = [newItem];
    }
    
    updatedCart = updatedCart.filter(item => item.itemcount >= 1 && Number.isInteger(item.itemcount));
    // Maintain positive integers as itemcount in the cart
    
    // Update the user's cart with the updated items
    return prisma.user.update({
      where: { id },
      data: {
        cart: updatedCart,
      },
    });}
    else{
      return null;
    }
  }

  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async updateUser(id: string, data: Partial<{ firstname: string; lastname: string; address: string; hometown: string ;email: string; password: string,cart: object }>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: string): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }


}
