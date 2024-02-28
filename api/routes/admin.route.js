import express from "express";
import {
  updateAdmin,
  deleteAdmin,
  getAdminListings,
  getAdmin,
} from "../controllers/admin.controllr.js";
import { verifyAdminToken } from "../utils/verifyAdmin.js"; // Import admin authentication middleware

const router = express.Router();

// Admin CRUD routes
router.post("/admin/update/:id", verifyAdminToken, updateAdmin);
router.delete("/admin/delete/:id", verifyAdminToken, deleteAdmin);
router.get("/admin/listings/:id", verifyAdminToken, getAdminListings);
router.get("/admin/:id", verifyAdminToken, getAdmin);

export default router;
