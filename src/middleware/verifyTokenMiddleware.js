import { verifyToken } from "../utils/jws.js"


export const verifyTokenMiddleware = (req, res, next) => {
    const token = req.session.token;
    if(!token){
        return res.status(401).json({message:"Token de acceso no proporcionado"});
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (error) {
    res.status(401).json({message:"Token de acceso invalido"}); 
    }

};