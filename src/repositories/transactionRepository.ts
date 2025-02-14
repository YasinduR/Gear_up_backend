import { PrismaClient, Transaction } from '@prisma/client';
import {cart} from '../types/cart'
const prisma = new PrismaClient();

export class TransactionRepository {

//Create
  async createTransaction(data: { userid: string; amount: number; type: string; cart: cart }): Promise<Transaction> {
    return prisma.transaction.create({ 
    data,
  });
 }


//Read
async getTransactionByUId(id: string): Promise<Transaction[]> {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userid: id },
    });
    return transactions;
  } catch (error) {
    throw new Error('Could not fetch transaction history. Please try again later.');
  }
}


async getAllTransaction(): Promise<Transaction[]> {
  return prisma.transaction.findMany();
}

async getTransactionByDate(date1: Date, date2: Date): Promise<Transaction[]> {
  try {

    console.log("Start DateTime: ", date1);
    console.log("End DateTime: ", date2);
    
    const transactions = await prisma.transaction.findMany({
      where: {
        datetime: {
          gte: date1, // Greater than or equal to date1
          lte: date2, // Less than or equal to date2
        },
      },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    throw new Error('Could not fetch transaction history. Please try again later.');
  }
}

async getTransactions(id: string | null, date1: Date, date2: Date,  page: number = 1,pageSize: number = 10): Promise<{ totalRecords: number; transactions: Transaction[] }> {
  try {
    console.log("Start DateTime: ", date1);
    console.log("End DateTime: ", date2);

  
    const whereClause: any = {
      datetime: {
        gte: date1, 
        lte: date2, 
      },
    };

    if (id) {
      if(id=="non_user"){  // Specify non user tranaction
        whereClause.userid = null;
      }
      else if(id!="all_users"){  // iN CASE OF all users where clauses no need to updated
        whereClause.userid = id;
      }
    }

    const skip = (page - 1) * pageSize; // Calculate the offset
    const take = pageSize; // Limit the number of results per chunk
    

    // Query to count total records
    const totalRecords = await prisma.transaction.count({
      where: whereClause,
    });

    const transactions = await prisma.transaction.findMany({
      where: whereClause,
      skip, // Skip the previous pages
      take, // Take the current chunk of data
      orderBy: {
        datetime: 'desc', // Sort by datetime in descending order
      },
    });

    return  {totalRecords, transactions} ;
  } catch (error) {
    console.error("Error fetching transactions: ", error);
    throw new Error('Could not fetch transaction history. Please try again later.');
  }
}





}