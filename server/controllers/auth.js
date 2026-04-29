const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//! <============> Register <============>
exports.register = async (req,res) => {
    try{
        const { name, email, password} = req.body;

        const userAlreadyIn = await User.findOne({ email });
        if(userAlreadyIn)
        {
            return res.status(400).json({ message: 'You already have registed before!'});
        }
        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,email,password: encryptedPassword
        })
        res.status(201).json({ message: 'You have registed sucessfuly'})
    }catch(err)
    {
        res.status(500).json({ error: err.message })
    }
}

//^ <============> LOGIN <============>

exports.login = async (req, res) => {
    try{
        const {email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user)
        {
        return res.status(400).json({ message: "incorrect email or password"}) //? Here I put poth email and password to make it harder for attacker to hint the account info
        }
        const correctPass = await bcrypt.compare(password, user.password);
        if(!correctPass)
        {
            return res.status(400).json({ message: "incorrect email or password"}) //? Same reason as above
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({token});
    } catch(err)
    {
        res.status(500).json({ error: err.message })
    }
}