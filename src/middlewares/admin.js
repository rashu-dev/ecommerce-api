export const adminMiddleware = async (req, res, next) => {
  const user = req.user;
  if (user.role === "Admin") {
    next();
  } else {
    return res.status(404).json({ message: "Unauthorized" });
  }
};
