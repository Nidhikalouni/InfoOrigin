export const adminAuth = (req, res, next) => {
    const token = req.cookies.token;
      console.log("🔹 Token received in adminAuth:", token)
    if (!token) return res.json({ success: false, message: 'Not authorized' });

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log("✅ Decoded Token:", decoded); 

        if (decoded.role !== 'admin') {
            return res.json({ success: false, message: 'Access denied: Admins only' });
        }
        req.userId = decoded.id;
        req.role = decoded.role;
        next();
    } catch (error) {
         console.error("❌ Token verification error:", error.message);
        res.json({ success: false, message: 'Invalid token' });
    }
};
