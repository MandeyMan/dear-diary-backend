const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

 
const registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
};


const loginUser = async (req, res) =>{
     const {username , password} = req.body;
     const user = await User.findOne({username});

     if( !user)
        return res.status(400).json({message :"User not found(Do you have Account?) "});
    const isMatch = await bcrypt.compare(password , user.password);

    if(!isMatch)
        return res.status(400).json({message :"Invalid credentials"});

    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET , {expiresIn : '10h'});

    res.json({
        token,
        user: {
          _id: user._id,
          username: user.username,
        
        }
      });

};


module.exports = { registerUser, loginUser };