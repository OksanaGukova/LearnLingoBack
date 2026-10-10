

export const checkRoles = (...roles) => (req, res, next) => {
    const { user } = req;

    console.log("User role:", req.user?.role);
    console.log("Allowed roles:", roles);

    if (!user) {
        return res.status(401).json({
            message: "User not authenticated",
        });
    }

    if (!roles.includes(user.role)) {
        return res.status(403).json({
            message: "Access denied",
        });
    }

    next();
};
