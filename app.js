const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.send("Hi, sent root");
});

//Index Route
app.get("/listings", async (req,res) => {
    const alllistings = await Listing.find({});
    res.render("listings/index.ejs", {alllistings});
})

//New Route
app.get("/listings/new", (req, res)=>{
  res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", async (req, res) =>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
})

//Create Route
app.post("/listings", async (req, res) =>{
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/Listings");
})

//Edit Route
app.get("/listings/:id/edit", async (req, res) =>{
   let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});

})

// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("Sample listing was saved");
//   res.send("Success");
// });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
