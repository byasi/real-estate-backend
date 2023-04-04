const db = require('../database/models');
 const {User} =db;

 class UserServices{    
    static async findUserByEmail(email){
        try {
            const user = await User.findOne({where:{email}});
            return user;
        } catch (error) {
            throw error;
        }
    }
    
    static async addUser(userDetails){
        try {
            const addedUser = await User.create(userDetails);
            return addedUser;
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id){
        try {
            const getUser = await User.findOne({where: {id: Number(id)}});
            return getUser;
        } catch (error) {
            throw error;
        }
    }

    static async findAllUsers(){
        try {
            const findUsers = await User.findAll();
            return findUsers;
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id){
        try {
            const deleteuser = await User.destroy({where:{id}});
            return deleteuser;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, userDetails){
        try {
            const updateUser = await User.update(userDetails, {where: {id:Number(id)}});
            return updateUser;
        } catch (error) {
            throw error;
        }
    }
 }

 module.exports = UserServices;