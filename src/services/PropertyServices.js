const db = require('../database/models');
 const {Property} =db;

 class PropertyServices{    
    static async findPropertyByName(name){
        try {
            const property = await Property.findOne({where:{name}});
            return property;
        } catch (error) {
            throw error;
        }
    }
    
    static async addProperty(propertyDetails){
        try {
            const addedproperty = await Property.create(propertyDetails);
            return addedproperty;
        } catch (error) {
            throw error;
        }
    }

    static async getPropertyById(id){
        try {
            const getProperty = await Property.findOne({where: {id: Number(id)}});
            return getProperty;
        } catch (error) {
            throw error;
        }
    }

    static async findAllProperty(){
        try {
            const findProperty = await Property.findAll();
            return findProperty;
        } catch (error) {
            throw error;
        }
    }

    static async deleteProperty(id){
        try {
            const deleteproperty = await Property.destroy({where:{id}});
            return deleteproperty;
        } catch (error) {
            throw error;
        }
    }

    static async updateProperty(id, propertyDetails){
        try {
            const updateProperty = await Property.update(propertyDetails, {where: {id:Number(id)}});
            return updateProperty;
        } catch (error) {
            throw error;
        }
    }
 }

 module.exports = PropertyServices;