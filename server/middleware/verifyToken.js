import jwt from 'jsonwebtoken';
import config from '../config/config';

const verifyToken = (request, response, next) => {
  try {
    const token = request.headers.authorization.split(' ')[1];
    if (!token) {
      return response.status(401).json({
        status: 'fail',
        message: 'No token provided in the request',
      });
    }
    const decoded = jwt.verify(token, config.jwtSecret);
    request.userId = decoded;
    next();
    return null;
  } catch (error) {
    return response.status(401).json({
      status: 'fail',
      message: 'Authentication failed',
    });
  }
};
export default verifyToken;
