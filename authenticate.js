export const auth = (req, res, next) => {
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if(!authHeader) {
    return res.status(401)
    .setHeader("WWW-Authenticate", "Basic")
    .json({error: "Unauthorized"});
    return next(new Error("Unauthorized"));
  }

  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64").toString().split(":");
  if(username === "admin" && password === "password") {
    return next();
  } else {
    return res.status(401)
    .setHeader("WWW-Authenticate", "Basic")
    .json({error: "Unauthorized"});
    return next(new Error("Unauthorized"));
  }
}