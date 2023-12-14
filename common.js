const jwt = require("jsonwebtoken");
const SECRET_KEY = "12345"

const authenticate = async (req, res,next) => {
    const token = req.headers.token;
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Authentication failed" });
    }
}
exports.authenticate = authenticate;