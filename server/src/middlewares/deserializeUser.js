import { verifyJwt } from "../utils/jwt.js";

const deserializeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    console.error("Token not found");
    return next();
  }
  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    console.error("Invalid Token");
    return next();
  }

  const { decoded } = verifyJwt(accessToken);

  if (!decoded) {
    console.error("Invalid Token");
    return next();
  }
  res.locals.user = decoded;
  return next();
};

export default deserializeUser;
