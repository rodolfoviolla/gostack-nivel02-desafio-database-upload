import { getRepository, DeleteResult } from 'typeorm';

import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<DeleteResult> {
    const transactionRepository = getRepository(Transaction);

    return transactionRepository.delete(id);
  }
}

export default DeleteTransactionService;
