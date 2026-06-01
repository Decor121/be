import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization denied. No token provided.' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Authorization denied. Token format must be Bearer <token>.' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'decor_secret_jwt_key_2026');
    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ error: 'Authorization denied. Invalid token.' });
  }
};

export default auth;
