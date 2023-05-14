const router = require("express").Router();
const {User,validate}= require("../models/AuthModel/user");
const bcrypt = require('bcrypt')

router.post("/",async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message});
        }
        const user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(409).json({message:"User with given email already exist !"});
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body,password:hashPassword}).save();
        return res.status(201).json({message:"User Created Successfully !"});
    } catch (error) {
        return res.status(500).json({message:"Internal Server Error ! "});
    }
})

module.exports = router;