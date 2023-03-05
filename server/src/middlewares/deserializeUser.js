import { verifyJwt } from "../utils/jwt.js";

const deserializeUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next();
  }
  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    return next();
  }

  const { decoded } = verifyJwt(accessToken);

  if (!decoded) {
    return next();
  }
  res.locals.user = decoded;
  return next();
};

export default deserializeUser;
