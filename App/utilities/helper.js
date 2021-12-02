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

  ensuretoken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    console.log("bearerHeader", bearerHeader);
    if (typeof bearerHeader != 'undefined') {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      req.token = bearerToken;
      console.log("3", req);
      console.log("bearerHeader");
      next();
    } else {
      console.log("1");
      res.sendStatus(403);
    }
  }

  comparePassword = (password, result) => {
    return bcrypt.compareSync(password, result);
  }
}

module.exports = new helperClass();
