import { Router } from "express";
import { UserModel } from "../models/user";

const router = Router();

router.get("/", async (req, res) => {
  const data = await UserModel.find();

  res.json({ data });
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Campos invalidos");

    return res.status(400).json({ message: "Campos invalidos" });
  }

  const userData = {
    email,
    password,
  };

  const newUser = new UserModel(userData);

  await newUser.save();

  res.json({ data: newUser });
});

export default router;
