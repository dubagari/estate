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

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.oofer;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }
    let parking = req.query.parking;

    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;

    if (type === undefined || type === "all") {
      type = { $in: ["sell", "rent"] };
    }

    const searchTrems = req.query.searchTrems || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.sort || "desc";

    const listing = await Listing.find({
      name: { $regex: searchTrems, $options: "i" },
      parking,
      offer,
      furnished,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
