const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { userDao } = require('../models');

const getUserById = async(id) => {
    return await userDao.getUserById(id);
}

console.log(getUserById);

const hashPassword = async(plainPassword) => {
    const saltRounds = 10;
    const salt =await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword, salt);
}

const signUp = async(lastName, firstName, birthday, phoneNumber, point, email, password) => {
    const EMAILREGEX    =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    const PWREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!EMAILREGEX.test(email)) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 400;
        throw error
    }

    if(!PWREGEX.test(password)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 400;
        throw error
    }

    const user = await userDao.getUserByEmail(email);
    
    if(user) {
        const error = new Error(`DUPLICATED_ENTRY_${email}_FOR_EMAIL`);
        error.statusCode = 401;

        throw error
    }

    const hashedPassword =  await hashPassword(password);
    return await userDao.createUser(lastName, firstName, birthday, phoneNumber, point, email, hashedPassword);
}

const signIn = async(email, password) => {
    const EMAILREGEX    =/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
    const PWREGEX =/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/

    if(!EMAILREGEX.test(email)) {
        const error = new Error('INVALID_EMAIL');
        error.statusCode = 400;

        throw error
    }

    if(!PWREGEX.test(password)) {
        const error = new Error('INVALID_PASSWORD');
        error.statusCode = 400;

        throw error
    }

    const user = await userDao.getUserByEmail(email);
    
    if(!user) {
        const error = new Error('WRONG_EMAIL')
        error.statusCode=401;
        throw error
    }

    const match = await bcrypt.compare(password, user.password);
    
    if(!match) {
        const error = new Error('WRONG_PASSWORD');
        error.statusCode = 401;

        throw error
    }

    const accessToken = jwt.sign({id:user.id}, process.env.JWT_SECRET,{
        algorithm: process.env.ALGORITHM,
        expiresIn: process.env.JWT_EXPIRES_IN
    });

    return accessToken;
};

const myUserInfo = async(user) => {

    const userInfo = {};
    userInfo['userName'] = {};
    userInfo.userName['firstName'] = user.firstName;
    userInfo.userName['lastName'] = user.lastName;
    userInfo['point'] = user.point;

    return userInfo;
}

module.exports = {
    getUserById,
    signUp,
    signIn,
    myUserInfo
}