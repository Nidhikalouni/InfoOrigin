import jwt from 'jsonwebtoken'
export const reviewerAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.json({ success: false, message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        if (decoded.role !== 'reviewer') {
            return res.json({ success: false, message: 'Access denied: Reviewer only' });
        }
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
        res.json({ success: false, message: 'Invalid token' });
    }
};
