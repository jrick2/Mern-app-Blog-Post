import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const privateKey = process.env.PRIVATE_KEY;

export function signJwt(object, options) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "HS256",
  });
}

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, privateKey);
    return {
      valid: true,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      decoded: null,
    };
  }
}
