import passport from "passport";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import UserRouter from "./user";

const router = Router();

const passportOptions = {
  badRequestMessage: "Falta el email o la contrasenia",
};

router.post(
  "/login",
  passport.authenticate("login", passportOptions),
  (req, res) => {
    res.render({ message: `Bienvenido ${req.user}` });
  }
);

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    console.log("Info Signup");
    console.log(err, user, info);

    if (err) return next(err);
    if (!user) return res.status(401).json({ data: info });
    else res.json({ msg: "Signup ok" });
  })(req, res, next);
});

router.post("/logout", (req, res) => {
  req.logOut(() => {
    done(null, false, {message: "Chau!"})
  })

  res.json({ message: "Chau!" });
});

router.get("/hello", (req, res) => {
  res.json({
    msg: "Hola",
    session: req.session,
  });
});

router.use("/user", isLoggedIn, UserRouter);

export default router;
