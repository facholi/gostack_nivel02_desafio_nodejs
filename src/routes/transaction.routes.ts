import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  const transactions = transactionsRepository.all();
  const balance = transactionsRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;

  const createTransaction = new CreateTransactionService(
    transactionsRepository,
  );

  const transaction = createTransaction.execute({ title, value, type });

  return response.json(transaction);
});

export default transactionRouter;
