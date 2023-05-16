const TransactionServices = require("../services/TransactionServices");

class TransactionControllers {
  static async createTransaction(req, res, next) {
    try {
      const transactionDetails = req.body;
      const checkCustomer = await TransactionServices.findCustomerById(
        req.body.CustomerId
      );
      if (checkCustomer) {
        const checkProperty = await TransactionServices.findByPropertyById(
          req.body.PropertyId
        );
        if (checkProperty) {
          const checkStatus = await checkProperty.status;
          const balance = checkProperty.balance - req.body.amountpaid;

          if (checkStatus !== "Sold") {
            const createTransaction = await TransactionServices.addTransaction(
              transactionDetails
            );
            await TransactionServices.updateBalance(checkProperty.id, {
              balance: balance,
            });

            if (checkStatus.balance === 0) {
              await TransactionServices.updatePropertyStatus(checkProperty.id, {
                status: "Sold",
              });
              await TransactionServices.updateTransactionStatus(
                createTransaction.id,
                { status: "Completed" }
              );

              return res.status(201).json({
                status: res.statusCode,
                message: "Transaction successfull Property sold",
                data: createTransaction,
              });
            } else {
              await TransactionServices.updatePropertyStatus(checkProperty.id, {
                status: "Pending",
              });

              return res.status(201).json({
                status: res.statusCode,
                message: `Transaction successfull, Your balance is ${balance}`,
                data: createTransaction,
              });
            }
          } else {
            return res.status(409).json({
              status: res.statusCode,
              message: "Property SOLD or RENTED",
            });
          }
        } else {
          return res.status(409).json({
            status: res.statusCode,
            message: "Property not found",
          });
        }
      } else {
        return res.status(409).json({
          status: res.statusCode,
          message: "Cystomer not found",
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async getAllTransactions(req, res, next) {
    try {
      const getTransactions = await TransactionServices.findAllTransactions();
      if (getTransactions.length === 0) {
        return res.status(404).json({
          status: res.statusCode,
          message: "No Transactions found",
        });
      } else {
        return res.status(200).json({
          status: res.statusCode,
          message: "Transactions found",
          getTransactions,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async findSingleTransaction(req, res, next) {
    try {
      const transaction = await TransactionServices.findTransactionById(
        req.params.id
      );
      if (!transaction) {
        return res.status(409).json({
          status: res.statusCode,
          message: "Transaction not found",
        });
      } else {
        return res.status(200).json({
          status: res.statusCode,
          data: transaction,
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async updateTransaction(req, res, next) {
    try {
      const updates = req.body;
      const getTransaction = await TransactionServices.findTransactionById(
        req.params.id
      );
      if (getTransaction) {
        const updateTransaction = await TransactionServices.updateTransaction(
          req.params.id,
          updates
        );
        if (updateTransaction) {
          return res.status(201).json({
            status: res.statusCode,
            message: "Updated successfully",
          });
        } else {
          return res.status(409).json({
            status: res.statusCode,
            message: "Failed to update",
          });
        }
      } else {
        return res.status(409).json({
          status: res.statusCode,
          message: "Invalid input",
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async findCustomerTransactions(req, res, next) {
    try {
      const customerTransactions =
        await TransactionServices.findAllCustomerTransactions(
          req.params.CustomerId
        );
      if (customerTransactions) {
        return res.status(200).json({
          status: res.statusCode,
          message: "Transactions found",
          data: customerTransactions,
        });
      } else {
        return res.status(409).json({
          status: res.statusCode,
          message: "No transactions found",
        });
      }
    } catch (error) {
      return next(error);
    }
  }

  static async deleteTransaction(req, res, next) {
    try {
      const transactionToDelete = await TransactionServices.findTransactionById(
        req.params.id
      );
      if (!transactionToDelete) {
        return res.status(409).json({
          status: res.statusCode,
          message: "Invalid Input",
        });
      } else {
        const deletedTransaction = await TransactionServices.deleteTransaction(
          req.params.id
        );
        return res.status(200).json({
          status: res.statusCode,
          message: "Transaction deleted successfully",
          data: deletedTransaction,
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

module.exports = TransactionControllers;
