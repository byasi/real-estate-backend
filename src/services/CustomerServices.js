const db = require('../database/models');
 const {Customer} =db;

 class CustomerServices{    
    static async findCustomerByName(name){
        try {
            const customer = await Customer.findOne({where:{name}});
            return customer;
        } catch (error) {
            throw error;
        }
    }
    
    static async addCustomer(customerDetails){
        try {
            const addedcustomer = await Customer.create(customerDetails);
            return addedcustomer;
        } catch (error) {
            throw error;
        }
    }

    static async getCustomerById(id){
        try {
            const getCustomer = await Customer.findOne({where: {id: Number(id)}});
            return getCustomer;
        } catch (error) {
            throw error;
        }
    }

    static async findAllCustomers(){
        try {
            const findCustomers = await Customer.findAll();
            return findCustomers;
        } catch (error) {
            throw error;
        }
    }

    static async deleteCustomer(id){
        try {
            const deletecustomer = await Customer.destroy({where:{id}});
            return deletecustomer;
        } catch (error) {
            throw error;
        }
    }

    static async updateCustomer(id, customerDetails){
        try {
            const updateCustomer = await Customer.update(customerDetails, {where: {id:Number(id)}});
            return updateCustomer;
        } catch (error) {
            throw error;
        }
    }
 }

 module.exports = CustomerServices;