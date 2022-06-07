export const isLoggedIn = (req, res, done) => {
  console.log("Is authenticated");
  console.log(req.isAuthenticated());

  if (!req.isAuthenticated())
    return res.status(401).json({ message: "No estas autorizado" });
  else done();
};
