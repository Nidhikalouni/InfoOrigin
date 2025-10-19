import { User } from "../Models/User.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import transporter from "../config/nodemailer.js";
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.json({
            success: false,
            "message": "Missing Details!"
        })
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, "message": "User already exist!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        //token generation
        const token = jwt.sign(
            { id: user._id },
            process.env.SECRET,
            { expiresIn: '7d' }
        )
        //sending token as a cookie in res
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        //sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to My App',
            text: `Welcome to my website.your account has been created with email id:${email}`
        }   
        await transporter.sendMail(mailOptions);
        res.status(201).json({
            success: true,
            message: 'User registered successfully!'
        })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: 'Missing details' })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: `User with email ${email} does not exist or invalid email` })
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: 'Invalid password' })
        }
        //token creation
        const token = jwt.sign(
            { id: user._id,role:user.role },
            process.env.SECRET,
            { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        return res.json({ success: true })
    } catch (error) {
        return res.json({ success: false, message: error.message })

    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        })
        return res.json({ success: true, message: 'Logged Out!' })
    } catch (error) {
        return res.json({ success: false, message: error.message })
    }
}

// export const checkAuth = async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) return res.json({ success: false });

//     const decoded = jwt.verify(token, process.env.SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) return res.json({ success: false });

//     return res.json({ success: true, user });
//   } catch (error) {
//     return res.json({ success: false, message: "Invalid token" });
//   }
// };

export const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token found" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET);
    if (!decoded || !decoded.id) {
      return res.json({ success: false, message: "Invalid token" });
    }

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ Success
    return res.json({
      success: true,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("checkAuth error:", error.message);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

