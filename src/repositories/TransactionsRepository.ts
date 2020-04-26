import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (acc, obj) => {
        if (obj.type === 'income') {
          acc.income += obj.value;
        }
        if (obj.type === 'outcome') {
          acc.outcome += obj.value;
        }

        acc.total = acc.income - acc.outcome;

        return acc;
      },
      { income: 0, outcome: 0, total: 0 },
    );
  }

  public create({ title, value, type }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
