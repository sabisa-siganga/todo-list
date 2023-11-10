const handleUserEmail = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // checking if username exists
    if (!username) {
      return res.status(403).json({
        error: "Email address required",
      });
    }

    // checking if password exists
    if (!password) {
      return res.status(403).json({
        error: "password required",
      });
    }

    // Checking if the user's email ends with the string '@gmail.com)'
    if (!username.endsWith("@gmail.com")) {
      return res.status(403).json({
        error: "Access denied. Only @gmail.com email address are allowed.",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleUserEmail };
