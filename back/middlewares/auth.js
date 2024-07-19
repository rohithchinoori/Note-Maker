const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).send({ error: "Invalid token" });
  }
};
