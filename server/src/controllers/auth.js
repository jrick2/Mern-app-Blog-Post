import {
  createSession,
  createUser,
  findSessions,
  updateSession,
  validateCredential,
} from "../service/auth.js";
import { signJwt } from "../utils/jwt.js";
// register
export async function createUserHandler(req, res) {
  try {
    const user = await createUser(req.body);

    if (!user) {
      return res.status(409).send("Faild to create User");
    }

    return res.status(201).json(user);
  } catch (e) {
    console.error(e);
    return res.status(409).json(e.message);
  }
}

// Get user
export async function getCurrentUser(req, res) {
  const user = res.locals.user;

  return res.status(200).json({
    user,
  });
}

// login

export async function createUserSessionHandler(req, res) {
  try {
    const user = await validateCredential(req.body);

    if (!user) {
      return res.status(401).send("Invalid email or password");
    }

    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // create an access token

    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: process.env.ACCESSTOKENTTL } // 1y
    );

    // return access

    return res.status(200).json({
      error: [],
      user,
      accessToken,
    });
  } catch (e) {
    return res.status(500).json(e.message);
  }
}

export async function getUserSessionsHandler(req, res) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.status(200).json(sessions);
}

export async function deleteSessionHandler(req, res) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.status(200).json({
    accessToken: null,
  });
}
