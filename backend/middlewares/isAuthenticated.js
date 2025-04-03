import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "invalid token", success: false });
        }

        req.id=decoded.userId;
        
        next();

    } catch (error) {
        console.error("Error in isAuthenticated middleware:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}
export default isAuthenticated;