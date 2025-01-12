const { validationResult } = require('express-validator');
const User = require('../modals/user');
const { setUser } = require('../service/auth');
const bcrypt = require('bcryptjs');


async function handleUserSignUp(req, res) {
    const body = req.body;    

    const success = false;

    const { username, email, password } = body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ success,Errors: errors.array()});
    }


    let user = await User.findOne({ email: body.email });
    
      try{
        if (!body || !username || !email || !password) {
            return res.status(400).json({ msg: 'Please fill the form completely.', success });
        }
  

        if(user){
            return res.status(400).json({success,msg: 'Sorry a user with email already exists.'})
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password,salt);
        const Password = password;
          
        const newUser = await User.create({
        username,
        email,
        password : secPass,
        secKey: Password
       });

       const data = {
        user:{
            id: newUser._id
        }
       };
    
       
       const authToken = setUser(data);

       console.log(authToken);

       return res.status(201).json({authToken, success: true });
      }
     catch(error){

        // console.error(error.message);
        res.status(500).json({ msg: "Internal Server Error",error,success });
     }
}

async function handleUserLogin(req, res) {
    const body = req.body;
    const success = false;
    const { email, password } = body;
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(400).json({success,Errors: errors.array()});
    }
    try{
        if (!body || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all the credentials.', success });
        }
    
        const logInUser = await User.findOne({email});        
    
        if(!logInUser) {
            return res.status(400).json({ msg: 'Invalid Credentials.', success });
        }


        const comparePassword = await bcrypt.compare(password,logInUser.password);    


        if(!comparePassword){
            return res.status(400).json({ msg: 'Invalid Credentials.', success});
        }
    
        const data = {
            user:{
                id: logInUser._id,
            }
           }
       const authToken = setUser(data);
    
        return res.status(200).json({ authToken, success: true });
    }catch(error){
        // console.error(error.message);
        return res.status(500).json({msg: 'Internal Server Error!',success});
    }
   
}

 module.exports = {handleUserSignUp,handleUserLogin};