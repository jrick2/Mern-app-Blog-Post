import jwt from "jsonwebtoken";

const privateKey = process.env.PRIVATE_KEY;
const publicKey = process.env.PUBLIC_KEY;

export function signJwt(object, options) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "HS256",
  });
}

export function verifyJwt(token) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    console.error(e);
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
