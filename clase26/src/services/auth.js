import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { UserModel } from "../models/user";

const StrategyOptions = {
  usernameField: "email",
  passwordField: "password",
  passReqToCallback: true,
};

const login = async (req, email, password, done) => {
  console.log("Login!!!");

  const user = await UserModel.findOne({ email });

  if (!user || !user.isValidPassword(password))
    return done(null, false, { mesage: "Email o contrasenia invalidos" });
  else {
    console.log("Todo ok");

    return done(null, user);
  }
};

const signup = async (req, email, password, done) => {
  try {
    console.log("Signup!!!");

    const { email, password } = req.body;

    console.log(req.body);

    if (!email) {
      console.log("Campos invalidos");
      return done(null, false, { message: "Campos invalidos" });
    }

    const query = {
      $or: [{ email: email }],
    };

    const user = await UserModel.findOne(query);

    if (user) {
      console.log("El usuario ya existe");
      console.log(user);
      return done(null, false, { message: "El usuario ya existe" });
    } else {
      const userData = {
        email,
        password,
      };

      const newUser = await UserModel.create(userData);

      return done(null, newUser);
    }
  } catch (err) {
    done(err);
  }
};

export const loginFunc = new LocalStrategy(StrategyOptions, login);
export const signupFunc = new LocalStrategy(StrategyOptions, signup);

passport.serializeUser((user, done) => {
  console.log("Se ejecuta el serializeUser");

  done(null, user._id);
});

passport.deserializeUser((userId, done) => {
  console.log("Se ejecuta el deserializeUser");

  UserModel.findById(userId).then((user) => {
    return done(null, user);
  });
});
