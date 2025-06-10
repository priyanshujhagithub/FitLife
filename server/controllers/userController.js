import User from '../models/userModel.js'

export const getUserProfile= async(req, res)=>{
    try{
        const user= await User.findById(req.user.id).select('-password').populate({
            path:'exercises',
            options:{sort:{date:-1}}
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({success:true,user});
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Failed to retrieve user profile",
            error: err.message
        });
    }
};