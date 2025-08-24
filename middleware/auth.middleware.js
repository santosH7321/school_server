import jwt from "jsonwebtoken";

const AuthMiddleware = async (req, res, next) => {
    try {
        const authorization = req.headers?.authorization;
        if(!authorization) 
            throw new Error("Unauthorized");
        const [type, token] = authorization.split(" ");
        if(type !== "Bearer" || !token)
            throw new Error("Unauthorized");
        const school = await jwt.verify(token, process.env.JWT_SECRET);
        req.school = school;
        next();
    } 
    catch (error) {
        res.status(401).json({ message: "Unauthorized" });
    }
}
export default AuthMiddleware;