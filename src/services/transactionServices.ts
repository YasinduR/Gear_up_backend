import { TransactionRepository } from "../repositories/transactionRepository";
import {cart} from '../types/cart'
const transactionRepository = new TransactionRepository();

export class TransactionService {


  async createTransaction(userid: string, amount: number, type: string, cart: cart) {
    // You might want to hash the password here
    return transactionRepository.createTransaction({ userid, amount, type, cart});
  }

  async getTransactionByUId(userId: string) {
    return transactionRepository.getTransactionByUId(userId);
  }

  async getTransactionByDate(date1: Date,date2: Date) {
    return transactionRepository.getTransactionByDate(date1,date2);
  }

  async getAllTransaction() {
    return transactionRepository.getAllTransaction();
  }
  
  async getTransactions(id: string | null, date1: Date, date2: Date,page:number,pagesize:number){
    return transactionRepository.getTransactions(id,date1,date2,page,pagesize);
  }

}