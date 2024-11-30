import jwt from 'jsonwebtoken';

const generateToken = (user)=>{
    const payload = {
        _id: user._id,
        name:user.fullName,
        email:user.email,
        role: user.role
    }
    const token = jwt.sign(payload,process.env.SECRET_KEY,{expiresIn: '2h'});
    return token;
}

export {generateToken};