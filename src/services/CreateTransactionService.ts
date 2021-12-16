import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const validationIncome = this.transactionsRepository.getBalance();

    if (type === 'income') {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }
    if (type === 'outcome' && value <= validationIncome.total) {
      const transaction = this.transactionsRepository.create({
        title,
        value,
        type,
      });

      return transaction;
    }

    throw Error('Your balance is not enough for this outcome');
  }
}

export default CreateTransactionService;
