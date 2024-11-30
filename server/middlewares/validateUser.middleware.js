import verifyToken from "../utils/verifyToken.js";

const validateUser = (req, res, next) => {
    try {
      const authHeader = req.headers['authorization'];

      if (!authHeader) {
        return res.status(403).json({
          message: "Unauthorized User! No token provided",
          success: false,
        });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({
            message: "Invalid authorization format",
            success: false,
        });
    }

      const decoded = verifyToken(token);
      if (!decoded) {
        return res.status(401).json({
          message: "Invalid token",
          success: false,
        });
      }
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        success: false,
        error: error.message,
      });
    }
};

export { validateUser };
