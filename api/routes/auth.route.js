import express from "express";
import {
  google,
  signOut,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut);

export default router;
// import express from "express";
// import {
//   signup,
//   signin,
//   google,
//   signOut,
//   adminSignup,
//   adminSignin,
//   adminSignOut,
// } from "../controllers/auth.controller.js";

// const router = express.Router();

// // User authentication routes
// router.post("/signup", signup);
// router.post("/signin", signin);
// router.post("/google", google);
// router.post("/signout", signOut);

// // Admin authentication routes
// router.post("/admin/signup", adminSignup);
// router.post("/admin/signin", adminSignin);
// router.post("/admin/signout", adminSignOut);

// export default router;
