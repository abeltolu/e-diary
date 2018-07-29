
export default class Validation {
  static checkUserInputs(request, response, next) {
    const {
      firstname, lastname, email, password,
    } = request.body;
    const nameFormat = /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    const emailPattern = /[^\s]*@[a-z0-9.-]*/i;
    if (!firstname || firstname === '' || firstname.trim() === undefined || (typeof firstname !== 'string')) {
      return response.status(400).json({
        status: 'fail',
        message: 'firstname is required',
      });
    }
    if (nameFormat.test(firstname)) {
      return response.status(400).json({
        status: 'fail',
        message: 'firstname cannot contain special character',
      });
    }
    if (!lastname || lastname === '' || lastname.trim() === undefined || (typeof lastname !== 'string')) {
      return response.status(400).json({
        status: 'fail',
        message: 'lastname is required',
      });
    }
    if (nameFormat.test(lastname)) {
      return response.status(400).json({
        status: 'fail',
        message: 'lastname cannot contain special character',
      });
    }
    if (!email || email === '' || email.trim() === undefined) {
      return response.status(400).json({
        status: 'fail',
        message: 'email is required',
      });
    }
    if (!emailPattern.test(email.trim())) {
      return response.status(400).json({
        status: 'fail',
        message: 'email is invalid',
      });
    }
    if (
      !password || password === undefined || password.toString().trim() === '' || (typeof password !== 'string')
    ) {
      return response.status(400).send({
        valid: false,
        message: 'password is required',
      });
    }
    if (password.length < 6) {
      return response.status(400).json({
        valid: false,
        message: 'password must be greater than six',
      });
    }
    return next();
  }
}
