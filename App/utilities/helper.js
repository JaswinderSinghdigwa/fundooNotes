const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let saltRounds = 10;
let salt = bcrypt.genSaltSync(saltRounds);

class helperClass {
  hashedPassword = (password) => {
    return bcrypt.hashSync(password, salt)
  }
  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, { expiresIn: '10H' });
  };
  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
}

module.exports = new helperClass();
