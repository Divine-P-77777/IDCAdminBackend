import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

export default authMiddleware;
