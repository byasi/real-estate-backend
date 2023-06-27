const express = require("express");
const multer = require("multer");
const path = require("path");
const PropertyControllers = require("../controllers/PropertyControllers");
const router = express.Router();

const storage = multer.diskStorage({
  destination: "./uploads/properties",
  filename: (req, file, cb) => {
    console.log("myFile", file);
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000000 },
  fileFilter: (req, file, cb) => {
    return checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Please insert images only");
  }
}

// apis
router.post(
  "/addProperty",
  upload.single("image"),
  PropertyControllers.registerProperty
);
router.get("/", PropertyControllers.getAllProperty);
router.get("/:id", PropertyControllers.findSingleProperty);
router.delete("/delete/:id", PropertyControllers.deleteProperty);
router.patch("/updateproperty/:id", PropertyControllers.updateProperty);

module.exports = router;
