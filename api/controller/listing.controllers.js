import Listing from "../models/listing.model.js";
import { errorHandler } from "../util/error.js";

export const creatingListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(401, "userenot found"));

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(404, "you can only delete your listing"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (error) {
    next(error);
  }
};

export const updatedListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return next(errorHandler(404, "user not found"));

  if (req.user.id !== listing.userRef)
    return next(errorHandler(404, "you can only update you listing"));

  try {
    const updateListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listingId = await Listing.findById(req.params.id);
    if (!listingId) return next(errorHandler(404, "listing not found"));

    res.status(200).json(listingId);
  } catch (error) {
    next(error);
  }
};
