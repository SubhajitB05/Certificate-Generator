const isAdmin = (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

export default isAdmin;
