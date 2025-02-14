import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

export class ItemRepository {

//Create
  async createItem(data: { name: string; description: string;stock:number; price: number;special_price:number;images:string[];unit:string;category:string;availability:string}): Promise<Item> {
   return prisma.item.create({ 
    data,
  });
 }

//ReadS
  async getItemById(id: string): Promise<Item | null> {
    return prisma.item.findUnique({
      where: { id },
    });
  }

  async getAllItems(): Promise<Item[]> {
    return prisma.item.findMany({
      orderBy: {id: 'asc'}, //acending order of uuid
    });
  }

//Update
  async updateItem(id: string, data: Partial<{ name: string; description: string;stock:number; price: number;special_price:number;images:string[];unit:string;category:string;availability:string}>): Promise<Item> {
    return prisma.item.update({
      where: { id },
      data,
    });
}

//Delete 
  async deleteItem(id: string): Promise<Item> {
    return prisma.item.delete({
      where: { id },
    });
  }



}
