import passport from "passport";
import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import { UserModel } from "../models/user";

const router = Router();

const passportOptions = {
  badRequestMessage: "Falta el email o la contrasenia",
};

router.get("/", async (req, res) => {
  res.render("login");
});

router.post(
  "/",
  passport.authenticate("login", passportOptions),
  (req, res, user) => {
    if (!user) return res.status(401).render("login-error");
    else res.redirect("/api/datos");
  }
);

router.get("/datos", isLoggedIn, (req, res) => {
  res.render("datos", {
    datos: req.user,
  });
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  passport.authenticate("signup", passportOptions, (err, user, info) => {
    console.log("Info Signup");
    console.log(err, user, info);

    if (err) return next(err);
    if (!user) return res.status(401).render("signup-error");
    else res.json({ msg: "Signup ok" });
  })(req, res, next);
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut( (err) => {
    if (err) {
      return next(err);
    }
  });

  res.render("login");
});

router.get("/hello", (req, res) => {
  res.json({
    msg: "Hola",
    session: req.session,
  });
});

export default router;
