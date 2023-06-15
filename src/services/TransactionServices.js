const db = require("../database/models");
const transaction = require("../database/models/transaction");
const { Transaction, Customer, Property } = db;

class TransactionServices {
  static async findTransactionById(id) {
    try {
      const transaction = await Transaction.findOne({ where: { id } });
      return transaction;
    } catch (error) {
      throw error;
    }
  }

  static async findAllTransactions() {
    try {
      const transactions = await Transaction.findAll({
        include: [Customer, Property],
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  static async findAllCustomerTransactions(CustomerId) {
    try {
      const transactions = await Transaction.findAll({
        where: { CustomerId },
        include: Property,
      });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  static async deleteTransaction(id) {
    try {
      const deleteTransaction = await Transaction.destroy({ where: { id } });
      return deleteTransaction;
    } catch (error) {
      throw error;
    }
  }

  static async addTransaction(transactionDetails) {
    try {
      const addTransaction = await Transaction.create(transactionDetails);
      return addTransaction;
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(id, transactionDetails) {
    try {
      const updateTransaction = await Transaction.update(transactionDetails, {
        where: { id: Number(id) },
      });
      return updateTransaction;
    } catch (error) {
      throw error;
    }
  }

  static async findCustomerById(id) {
    try {
      const customer = await Customer.findOne({ where: { id } });
      return customer;
    } catch (error) {
      throw error;
    }
  }

  static async findByPropertyById(id) {
    try {
      const property = await Property.findOne({ where: { id } });
      return property;
    } catch (error) {
      throw error;
    }
  }

  static async updateTransaction(id, updates) {
    try {
      const transactions = await Transaction.update(updates, { where: { id } });
      return transactions;
    } catch (error) {
      throw error;
    }
  }

  static async updatePropertyStatus(id, propertystatus) {
    try {
        const status = await Property.update(propertystatus,{where: {id}});
    return status;

    } catch (error) {
      throw error;
    }
  }

  static async updateTransactionStatus(id, transactionstatus) {
    try {
        const status = await Transaction.update(transactionstatus, {where: {id}});
        return status;

    } catch (error) {
      throw error;
    }
  }

  static async updateBalance(id, balance) {
    try {
      const property = await Property.update(balance, { where: { id } });
      return property;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TransactionServices;
