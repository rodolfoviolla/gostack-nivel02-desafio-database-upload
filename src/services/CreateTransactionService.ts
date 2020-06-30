import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateCategoryService from './CreateCategoryService';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    type,
    value,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);

    if (type === 'outcome') {
      const transactions = await transactionsRepository.find();
      const { total } = transactionsRepository.getBalance(transactions);

      if (value > total) {
        throw new AppError('Outcome cannot exceed the income');
      }
    }

    const createCategory = new CreateCategoryService();

    const newCategory = await createCategory.execute({
      title: category,
    });

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category: newCategory,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
