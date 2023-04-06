const UserServices = require('../services/UserServices');

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

class UserControllers {
    static async registerUser(req,res,next){
        try {
            const userDetails = req.body;

            //check if user exists
            const userExists = await UserServices.findUserByEmail(req.body.email);

            if (userExists) {
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'User already exists'
                })
            } else {
                //hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                //add the user
                const createdUser = await UserServices.addUser({...userDetails, password: hashedPassword});

                return res.status(201).json({
                    status: res.statusCode,
                    Message: 'User created successfully',
                    Data: createdUser
                })
            }

        } catch (error) {
            return next(error);
        }
    }

    //find a single user

    static async findSingleUser(req,res,next){
        try {
            const user = await UserServices.getUserById(req.params.id);
            if (!user){
                return res.status(409).json({
                    status: res.statusCode,
                    message: 'User not found'
                })
            }else{
                return res.status(200).json({
                    status: res.statusCode,
                    Data: user
                })
            }
        } catch (error) {
            return next(error);
        }
    }

        //find all users

    static async getAllUsers(req,res,next){
        try {
            const getUsers = await UserServices.findAllUsers();
            if(getUsers.length === 0){
                return res.status(404).json({
                    status: res.statusCode,
                    message:'No users found'
                })
            }else {
                return res.status(200).json({
                    status: res.statusCode,
                    data: getUsers
                })
            }                
        } catch (error) {
            return next(error);
        }
    }


    // DELETE USERS

    static async deleteUser(req,res, next){
        try {
            const userToDelete = await UserServices.getUserById(req.params.id);
            if (!userToDelete){
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'Invalid User'
                })
            }else{
                const deletedUser = await UserServices.deleteUser(req.params.id);
                return res.status(200).json({
                    status: res.statusCode,
                    Message: 'User deleted',
                    Data: deletedUser
                })
            }
        } catch (error) {
            return next(error);
        }
    }


    //log in 

    static async login(req,res,next){
        try {
            //login requirements

            const loginDetails ={
                email: req.body.email,
                password: req.body.password
            }

            //check if user exists

            const userExists = await UserServices.findUserByEmail(loginDetails.email);
            if(userExists){
                //compare passwords

                const passwordComparison = await bcrypt.compare(loginDetails.password, userExists.password);
                if (passwordComparison){
                    //generate token

                    const token = jwt.sign({id: userExists.id, name:userExists.name, email: userExists.email}, process.env.JWT_SECRETKEY, {expiresIn:"1hr",})

                    return res.status(200).json({
                        status: res.statusCode,
                        Message:"Login successful",
                        token: token
                    })
                }else{
                    return res.status(409).json({
                        status: res.statusCode,
                        Message: "Wrong password or email"
                    })
                }
            }else{
                return res.status(409).json({
                    status: res.statusCode,
                    Message: "Wrong password or email"
                })
            }

        } catch (error) {
            return next(error);
        }
    }

    static async getUserProfile(req,res,next){
        try {
            const token = req.params.token;

            if(token){
                const data = jwt.verify(token, process.env.JWT_SECRETKEY);
                return res.status(200).json({
                    status: res.statusCode,
                    data
                const decodeToken = await jwt.verify(token, process.env.JWT_SECRETKEY);
                return res.status(200).json({
                    status: res.statusCode,
                    data: decodeToken
                })
            }else{
                return res.status(409).json({
                    status: res.statusCode,
                    Message: "Token has expired, Please login again"
                })
            }
        } catch (error) {
            return next(error);
        }
    }
    static async updateUser(req,res,next){
        try {
            const userToUpdate = req.body;
            //verify if user exists
            const getUser = await UserServices.getUserById(req.params.id);
            if (getUser){
                
                //update the user
                
                const updateUser = await UserServices.updateUser(req.params.id, userToUpdate);
                if(updateUser){
                    return res.status(200).json({
                        status: res.statusCode,
                        updateUser
                        
                    })
                }else {
                    return res.status(409).json({
                        status: res.statusCode,
                        Message: 'Invalid user'
                    })
                }
            }else{
                return res.status(409).json({
                    status: res.statusCode,
                    Message: 'User not found'
                })
            }
        } catch (error) {
            return next(error);
        }
    }
}

module.exports = UserControllers;