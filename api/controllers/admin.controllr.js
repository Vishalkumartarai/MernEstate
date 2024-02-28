import bcryptjs from "bcryptjs";
import Admin from "../models/admin.model.js";
import { errorHandler } from "../utils/error.js";
import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "Admin API route is working!",
  });
};

export const updateAdmin = async (req, res, next) => {
  if (req.admin.id !== req.params.id)
    return next(
      errorHandler(401, "You can only update your own admin account!")
    );
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedAdmin._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  if (req.admin.id !== req.params.id)
    return next(
      errorHandler(401, "You can only delete your own admin account!")
    );
  try {
    await Admin.findByIdAndDelete(req.params.id);
    // Add logic for clearing admin session or token if needed
    res.status(200).json("Admin has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getAdminListings = async (req, res, next) => {
  if (req.admin.id === req.params.id) {
    try {
      const listings = await Listing.find({ adminRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

export const getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) return next(errorHandler(404, "Admin not found!"));

    const { password: pass, ...rest } = admin._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
