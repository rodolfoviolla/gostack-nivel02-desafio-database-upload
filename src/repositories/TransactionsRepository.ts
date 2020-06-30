import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public getBalance(transactions: Transaction[]): Balance {
    return transactions.reduce(
      (acc, transaction) => {
        let { income, outcome, total } = acc;

        switch (transaction.type) {
          case 'income':
            income += transaction.value;
            break;
          case 'outcome':
            outcome += transaction.value;
            break;
          default:
            break;
        }

        total = income - outcome;

        return { income, outcome, total };
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }
}

export default TransactionsRepository;
