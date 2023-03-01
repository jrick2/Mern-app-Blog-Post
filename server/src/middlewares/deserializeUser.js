import get from "lodash";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import { verifyJwt } from "../utils/jwt.js";

const deserializeUser = async (req, res, next) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    throw new UnauthenticatedError("Invalid Token");
  }

  const { decoded } = verifyJwt(accessToken);

  if (!decoded) {
    throw new UnauthenticatedError("Invalid Token");
  }
  res.locals.user = decoded;
  return next();
};

export default deserializeUser;
