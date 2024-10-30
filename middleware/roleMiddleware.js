const roleMiddleware = (requiredRole) => {
  return (req, res, next) => {
    // Assume user information is attached to req.session or req.user
    const user = req.session.user || req.user;

    if (!user) {
      return res.status(403).json({ message: "Access denied. No user logged in." });
    }

    if (user.role !== requiredRole) {
      return res.status(403).json({ message: "Access denied. Insufficient permissions." });
    }

    next(); // User has the required role
  };
};

module.exports = roleMiddleware;
