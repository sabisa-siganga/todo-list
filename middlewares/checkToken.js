const jwt = require("jsonwebtoken");
const SECRET_KEY = "sabi1234";

// Function to generate a JWT token for a user
const generateToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: "2d" });
};

const CheckJWTToken = (req, res, next) => {
  // Checking if the request's content type id JSON
  if (req.get("Content-Type") !== "application/json") {
    return res
      .status(403)
      .json({ error: "Only JSON content type is allowed." });
  }

  let token = "";
  // get token from headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // check if the token exists using the secret key, return error if it doesn't
  if (token) {
    jwt.verify(token, SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(400).json({ error: "Invalid Token" });
      } else {
        req.user = decoded;

        // Continue to the next controller
        next();
      }
    });
  } else {
    // error handling
    res.status(400).json({ error: "Not Authorized, no token" });
  }
};

module.exports = { CheckJWTToken, generateToken };
