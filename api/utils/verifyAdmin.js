import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
import Admin from "../models/admin.model.js";

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.admin_access_token;

  if (!token) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, async (err, decoded) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    try {
      const admin = await Admin.findById(decoded.adminId);

      if (!admin) {
        return next(errorHandler(403, "Forbidden")); // Admin not found
      }

      req.admin = admin;
      next();
    } catch (error) {
      next(error);
    }
  });
};
