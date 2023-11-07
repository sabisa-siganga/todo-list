const checkAddRequests = async (req, res, next) => {
  try {
    // Checking if the task exceeds 140 characters
    const { description } = req.body;

    if (!description) {
      return res.status(400).json({ error: "Description required" });
    }

    if (description && description.length > 140) {
      return res
        .status(403)
        .json({ error: "Todo item description exceeds 140 characters" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { checkAddRequests };
