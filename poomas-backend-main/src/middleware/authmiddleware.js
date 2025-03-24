const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('Unauthorized - Missing or invalid token');
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin'|| req.user.role === 'seller' || req.user.role === 'user') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
};

module.exports = { protect, isAdmin };
