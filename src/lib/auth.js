import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = {
  signToken(user) {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing");
    }

    return jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );
  },
};

export default auth;
