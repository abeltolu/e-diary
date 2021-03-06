import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../config/connect';

/**
 * @class Authentication
 */
class AuthController {
  /**
     * @static method to create a new user
     * @param {object} request request object,
     * @param {objec} response  response object
     */
  static async signup(request, response) {
    const {
      firstname, lastname, email, password,
    } = request.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      const userQuery = `SELECT * FROM users WHERE email = '${email}'`;
      const userExists = await db.query(userQuery);
      if (userExists.rowCount > 0) {
        return response.status(409).json({
          status: 'fail',
          message: 'user with this email already exists',
        });
      }
      const insertQuery = `INSERT INTO users (firstname, lastname, email, password) VALUES ('${firstname}' ,'${lastname}', '${email}','${hashedPassword}') RETURNING * `;
      const result = await db.query(insertQuery);
      const payload = {
        id: result.rows[0].id,
        email: result.rows[0].email,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });
      return response.status(201).json({
        status: 'success',
        message: 'account was successfully created',
        token,
        firstname: result.rows[0].firstname,
        lastname: result.rows[0].lastname,
        email: result.rows[0].email,
        password: result.rows[0].password,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: error.message,
      });
    }
  }

  /**
   * @static method to login a user
   * @param {Object} request  request object
   * @param {Object} response response object
   */
  static async login(request, response) {
    const { email, password } = request.body;
    const insertQuery = `SELECT * FROM users WHERE email = '${email}'`;
    try {
      const result = await db.query(insertQuery);
      const validPassword = bcrypt.compareSync(password, result.rows[0].password);
      if (!validPassword || result.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'password or email is incorrect',
        });
      }
      const payload = {
        id: result.rows[0].id,
        email: result.rows[0].email,
      };
      const token = jwt.sign(payload,
        process.env.JWT_SECRET,
        { expiresIn: 86400 });
      return response.status(200).json({
        status: 'successful',
        message: 'successfully signed in',
        token,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.stack,
      });
    }
  }

  /**
   * @static method to get all users
   * @param {Object} request  request object
   * @param {Object} response response object
   */
  static async getAllUsers(request, response) {
    const query = 'SELECT * FROM users;';
    try {
      const result = await db.query(query);
      return response.status(200).json({
        status: 'success',
        message: 'all users',
        users: result.rows,
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }

  /**
   * @static method to get a single user
   * @param {Object} request  request object
   * @param {Object} response response object
   */
  static async getUserDetails(request, response) {
    const { userId } = request.params;
    const query = `SELECT * FROM users WHERE id = ${userId}`;
    try {
      const data = await db.query(query);
      if (data.rowCount === 0) {
        return response.status(404).json({
          status: 'fail',
          message: 'user not found',
        });
      }
      return response.status(200).json({
        status: 'success',
        message: 'user details successfully returned',
        user: data.rows[0],
      });
    } catch (error) {
      return response.status(500).json({
        status: 'error',
        message: error.message,
      });
    }
  }
}
export default AuthController;
