const PropertyServices = require('../services/PropertyServices');


class PropertyControllers {
    static async registerProperty(req,res,next){
        try {
            const propertyDetails = req.body;

            const propertyExists = await PropertyServices.findPropertyByName(req.body.name);

            if (propertyExists) {
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'Property already exists'
                })
            } else {

                //add the property
                const createdProperty = await PropertyServices.addProperty(propertyDetails);
                return res.status(201).json({
                    status: res.statusCode,
                    message: 'Property created successfully',
                    data: createdProperty
                })
            }

        } catch (error) {
            return next(error);
        }
    }

    //find a single property

    static async findSingleProperty(req,res,next){
        try {
            const property = await PropertyServices.getPropertyById(req.params.id);
            if (!property){
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'Property not found'
                })
            }else{
                return res.status(200).json({
                    status: res.statusCode,
                    data: property
                })
            }
        } catch (error) {
            return next(error);
        }
    }

        //find all property

    static async getAllProperty(req,res,next){
        try {
            const getProperty = await PropertyServices.findAllProperty();
            if(getProperty.length === 0){
                return res.status(404).json({
                    status: res.statusCode,
                    message:'No property found'
                })
            }else {
                return res.status(200).json({
                    status: res.statusCode,
                    data: getProperty
                })
            }                
        } catch (error) {
            return next(error);
        }
    }


    // DELETE PROPERTY

    static async deleteProperty(req,res, next){
        try {
            const propertyToDelete = await PropertyServices.getPropertyById(req.params.id);
            if (!propertyToDelete){
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'Invalid Input'
                })
            }else{
                const deletedProperty = await PropertyServices.deleteProperty(req.params.id);
                return res.status(200).json({
                    status: res.statusCode,
                    message: 'Property deleted successfully',
                    data: deletedProperty
                })
            }
        } catch (error) {
            return next(error);
        }
    }

   
    static async updateProperty(req,res,next){
        try {
            const propertyToUpdate = req.body;
            
            const getProperty = await PropertyServices.getPropertyById(req.params.id);
            if (getProperty){
                
                const updateProperty = await PropertyServices.updateProperty(req.params.id, propertyToUpdate);
                if(updateProperty){
                    return res.status(200).json({
                        status: res.statusCode,
                        message: 'property updated',
                        updateProperty
                        
                    })
                }else {
                    return res.status(409).json({
                        status: res.statusCode,
                        message: 'Invalid Input'
                    })
                }
            }else{
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'Property not found'
                })
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = PropertyControllers;