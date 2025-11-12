module.exports = (req, res, next) => {
  // Placeholder: check req.user.role or similar
  if (req.user && req.user.isAdmin) return next();
  return res.status(403).json({ message: 'Admin only' });
};
