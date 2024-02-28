import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
// import User from "../models/user.model.js";
// import bcryptjs from "bcryptjs";
// import { errorHandler } from "../utils/error.js";
// import jwt from "jsonwebtoken";
// import Admin from "../models/admin.model.js";

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json("User created successfully!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) return next(errorHandler(404, "User not found!"));
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validUser._doc;
//     res
//       .cookie("access_token", token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const signOut = async (req, res, next) => {
//   try {
//     res.clearCookie("access_token");
//     res.status(200).json("User has been logged out!");
//   } catch (error) {
//     next(error);
//   }
// };

// // admin
// export const adminSignup = async (req, res, next) => {
//   const { adminname, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newAdmin = new Admin({ adminname, email, password: hashedPassword });
//   try {
//     await newAdmin.save();
//     res.status(201).json("Admin created successfully!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const adminSignin = async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const validAdmin = await Admin.findOne({ email });
//     if (!validAdmin) return next(errorHandler(404, "Admin not found!"));
//     const validPassword = bcryptjs.compareSync(password, validAdmin.password);
//     if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
//     const token = jwt.sign({ id: validAdmin._id }, process.env.JWT_SECRET);
//     const { password: pass, ...rest } = validAdmin._doc;
//     res
//       .cookie("admin_access_token", token, { httpOnly: true })
//       .status(200)
//       .json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const adminSignOut = async (req, res, next) => {
//   try {
//     res.clearCookie("admin_access_token");
//     res.status(200).json("Admin has been logged out!");
//   } catch (error) {
//     next(error);
//   }
// };
