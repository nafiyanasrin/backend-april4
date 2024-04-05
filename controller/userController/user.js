const bcrypt = require('bcrypt');
const User = require('../../models/user');

//////////////register\\\\\\\\\\\\\\\\\
const registerUserCntrl =  async (req,res) => {
    try {
        console.log(req);
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.email &&
         !req.body.password) throw Error('Request body is empty');

      const {
            email,
            firstName,
            lastName,
            password,
           } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        email,
        firstName,
        lastName,
        password:hashedPassword
    });
    const savedUserToDb = await newUser.save();
    console.log('kjlhgfcd',savedUserToDb);
    if(!savedUserToDb) throw Error('Not able to save user, please try again later');
    res.status(200).send({
        message: "successFully registered the user"
    });
    } catch (error) {
        
        res.status(500).send({
             error: error.message, 
        });
    }
}


//////////////login\\\\\\\\\\\\\\\\\
const loginUserCntrl =  async (req,res) => {
    try {
      if(!req.body) throw Error('Request body is empty');
      if(!req.body.email && 
         !req.body.password) throw Error('Request body is empty');

      const {
            email,
            password,
           } = req.body;
    const userByEmail = await User.findOne({ email: email});
    if(!userByEmail) throw Error('user with the Given mail not found');
    const hashedPassword = await  bcrypt.compare(password, userByEmail.password)

    if(!hashedPassword) throw Error('Given password is incorrect, please try again later');
    res.status(200).send(userByEmail);
    } catch (error) {
        
        res.status(500).send({
             error: error.message, 
        });
    }
}



const getAllUser = async (req, res, next) => {
    try {
        const user = await User.find();
        if(!user) throw new Error('users not found');
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            error: error.message
        })
    }
};


//////////////////////forget//////////////////////////////////////////
const updateForget = async (req, res, next) => {
    try {
        console.log(req.body);
//check whether the user email address and password is properly passed from the react
        if(!req.body) throw new Error('Body is required');
//assign the value to variables nammed email and password from req.body(like: let email = req.body.email)        
        const {
            email,
            newPassword
        } = req.body;
        
//try to find user in mongodb
console.log(1);
console.log(email);
        const updatingUser = await User.findOne({email: email});
console.log(updatingUser);
//handle if user is not there then throw an error. without user we cant update the user password      
        
//if user is already exist then hash the password            
            const hashedPassword = await bcrypt.hash(newPassword, 10);
//updatingUser is the found user we just change the value of password as hashedPassword
            updatingUser.password = hashedPassword;
//then save it to mongodb
console.log(3);
            const savedUserToDb = await updatingUser.save();
            console.log(3);
//if successfully saved send to react user user saved successfully
            if(savedUserToDb) {
                res.status(200).send({
                    msg: 'User saved successfully'
                })
            }
           
    } catch (error) {
        console.log(4);
//if any error is thrown it will be getting in this catch block
        res.status(500).send({
            error: error.message
        });
    }
}


module.exports = {
   registerUserCntrl,
   loginUserCntrl,
   getAllUser,
   updateForget
}