// const jwt = require('jsonwebtoken');

// const verifyToken = (req, res, next) => {
//     const token = req.header('Authorization');

//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized: No token provided' });
//     }

//     try {
//         const secretKey = process.env.JWT_SECRET || 'your-secret-key';
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//     }
// };

// module.exports = verifyToken;
