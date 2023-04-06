const CustomerServices = require('../services/CustomerServices');


class CustomerControllers {
    static async registerCustomer(req,res,next){
        try {
            const customerDetails = req.body;

            const customerExists = await CustomerServices.findCustomerByName(req.body.name);

            if (customerExists) {
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'Customer already exists'
                })
            } else {

                //add the customer
                const createdCustomer = await CustomerServices.addCustomer(customerDetails);
                return res.status(201).json({
                    status: res.statusCode,
                    Message: 'Customer created successfully',
                    Data: createdCustomer
                })
            }

        } catch (error) {
            return next(error);
        }
    }

    //find a single customer

    static async findSingleCustomer(req,res,next){
        try {
            const customer = await CustomerServices.getCustomerById(req.params.id);
            if (!customer){
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'Customer not found'
                })
            }else{
                return res.status(200).json({
                    status: res.statusCode,
                    Data: customer
                })
            }
        } catch (error) {
            return next(error);
        }
    }

        //find all customers

    static async getAllCustomers(req,res,next){
        try {
            const getCustomers = await CustomerServices.findAllCustomers();
            if(getCustomers.length === 0){
                return res.status(404).json({
                    status: res.statusCode,
                    message:'No customers found'
                })
            }else {
                return res.status(200).json({
                    status: res.statusCode,
                    data: getCustomers
                })
            }                
        } catch (error) {
            return next(error);
        }
    }


    // DELETE CUSTOMERS

    static async deleteCustomer(req,res, next){
        try {
            const customerToDelete = await CustomerServices.deleteCustomer(req.params.id);
            if (!customerToDelete){
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'Invalid Input'
                })
            }else{
                const deletedCustomer = await CustomerServices.deleteCustomer(req.params.id);
                return res.status(200).json({
                    status: res.statusCode,
                    Message: 'Customer deleted',
                    Data: deletedCustomer
                })
            }
        } catch (error) {
            return next(error);
        }
    }

   
    static async updateCustomer(req,res,next){
        try {
            const customerToUpdate = req.body;
            
            const getCustomer = await CustomerServices.getCustomerById(req.params.id);
            if (getCustomer){
                
                const updateCustomer = await CustomerServices.updateCustomer(req.params.id, customerToUpdate);
                if(updateCustomer){
                    return res.status(200).json({
                        status: res.statusCode,
                        updateCustomer
                        
                    })
                }else {
                    return res.status(409).json({
                        status: res.statusCode,
                        Message: 'Invalid Input'
                    })
                }
            }else{
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'Customer not found'
                })
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = CustomerControllers;