import { ItemRepository } from "../repositories/itemRepository";

const itemRepository = new ItemRepository();

export class ItemService {


  async createItem(name: string, description: string,stock:number, price: number,special_price:number,images:string[],unit:string,category:string,availability:string) {
    // You might want to hash the password here
    return itemRepository.createItem({ name, description, stock,price,special_price,images,unit,category,availability });
  }

  async updateItem(id: string, name?: string, description?: string,stock?:number, price?: number,special_price?:number,images?:string[],unit?:string,category?:string,availability?:string) {
    // You might want to hash the password hereimage
    return itemRepository.updateItem(id, { name, description, stock,price,special_price,images,unit,category,availability });
  }

  async getItemById(id: string) {
    return itemRepository.getItemById(id);
  }

  async getAllItems() {
    return itemRepository.getAllItems();
  }

  async deleteItem(id: string) {
    return itemRepository.deleteItem(id);
  }


}
