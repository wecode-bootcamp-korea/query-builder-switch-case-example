const { userService } = require('../services')
const { catchAsync } = require('../utils/error');

const signUp = catchAsync(async(req, res) => {
    const DEFAULT_POINT = 1000000;
    const { lastName, firstName, birthday, phoneNumber, email, password } = req.body;
    if(!lastName||!firstName||!birthday||!phoneNumber||!email||!password) {
        const error = new Error('KEY_ERROR');
        error.statusCode = 400;

        throw error
    }
    const insertId =  await userService.signUp(lastName, firstName, birthday, phoneNumber, DEFAULT_POINT, email, password);
    res.status(201).json({insertId}); 
});

const signIn = async(req, res) => {
    const { email, password } = req.body;

    try {
        if(!email||!password) {
            const error = new Error('KEY_ERROR');
            error.statusCode = 401;

            throw error
        }

        const accessToken = await userService.signIn(email, password);
        res.status(200).json({accessToken});

    } catch (error) {
        console.log(error);
        res.status(error.statusCode).json({message : error.message});
    }
};

const myUserInfo = catchAsync(async (req, res) => {
	const user = req.user;

	const userInfo = await userService.myUserInfo(user);
	res.status(200).json({ data: userInfo });
});

module.exports = {
    signUp,
    signIn,
    myUserInfo
}