import UserModel from "../models/auth/register.js";
import SessionModel from "../models/auth/login.js";
import omit from "lodash";

// Register
export async function createUser(input) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error) {
    console.error(error.message, "Faild to create User");
    return res.status(409).send("Email already exists");
  }
}

export async function validateCredential({ email, password }) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return false;
    }

    const isvalid = await user.comparePassword(password);
    if (!isvalid) {
      return false;
    }

    return omit(user.toJSON(), "password");
  } catch (error) {
    return false;
  }
}

export async function findUser(query) {
  try {
    return UserModel.findOne(query).lean();
  } catch (error) {
    console.error(error.message, "Invalid");
  }
}

// Login

export async function createSession(userId, userAgent) {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });

    return session.toJSON();
  } catch (error) {
    console.error(error.message, "Can't Create Session");
  }
}

export async function findSessions(query) {
  try {
    return SessionModel.find(query).lean();
  } catch (error) {
    console.error(error.message);
  }
}

export async function updateSession(query, update) {
  try {
    return SessionModel.updateOne(query, update);
  } catch (error) {
    console.error(error.message);
  }
}

export async function findUserId(input) {
  UserModel.findById(input);
}
