const handleUserEmail = async (req, res, next) => {
  try {
    // Checking if the user's email ends with the string '@gmail.com)'
    const userEmail = req.body.username;

    if (!userEmail || !userEmail.endsWith("@gmail.com")) {
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
