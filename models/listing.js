const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    description: {
        type: String,
    },
    image: {
    filename: String,
    url: String
  },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    country: {
        type: String,
        required: [true, "Country is required"]
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
