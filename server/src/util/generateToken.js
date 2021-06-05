import jwt from 'jsonwebtoken'

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

export default generateToken