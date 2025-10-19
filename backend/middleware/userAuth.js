import jwt from 'jsonwebtoken';
export const userAuth = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token)return res.json({ success: false, message: 'Not authorized' });
    try {
        const decoded = jwt.verify(token,process.env.SECRET);
        req.userId = decoded.id;// user id from jwt
        req.role = decoded.role;
        next();//move to next controller
    } catch (error) {
         res.json({ success: false, message: 'Invalid token' });
        
    }
}
