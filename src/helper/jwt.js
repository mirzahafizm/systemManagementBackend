const jwt = require("jsonwebtoken");

const generateJWT = (id) => {
  const rand = [...Array(5)]
    .map((i) => (~~(Math.random() * 36)).toString())
    .join("");

  return jwt.sign(
    {
      u: id,
      i: `${process.env.JWT_IDENTIFIER}${rand}`,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    },
  );
};

const decodeJWT = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (
      decoded.i.slice(0, process.env.JWT_IDENTIFIER.length) !==
      process.env.JWT_IDENTIFIER
    )
      return null;
    return decoded.u;
  } catch (e) {
    throw RangeError(`401-${e.message ?? "Unauthorized"}`);
  }
};

module.exports = {generateJWT, decodeJWT}