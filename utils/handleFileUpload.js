const fs = require("fs");
const multer = require("fastify-multer");
const excelToJson = require("convert-excel-to-json");

// uploading to storage using multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "../../uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "text" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
