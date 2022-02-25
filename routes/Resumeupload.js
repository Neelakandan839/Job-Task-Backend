const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();

var today = new Date();
const upload = multer({
  storage: multer.diskStorage({
    destination: `${__dirname}/../public/resume`,
    filename: (req, file, cb) => {
      cb(
        null,
        `${today.getDate()}_${today.getMonth() + 1}_${today.getFullYear()}_${
          file.originalname
        }`
      );
    },

    fileFilter: (req, file, cb) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".pdf") {
        cb(new Error("File type not supported"));
      }
      cb(null, true);
    },
  }),
});

router.post("/resume", upload.single("file"), (req, res) => {
  const { file } = req;

  const fname = `${today.getDate()}_${
    today.getMonth() + 1
  }_${today.getFullYear()}_${file.originalname}`;

  res.send({
    message: "File uploaded successfully",
    url: `/host/resume/${fname}`,
  });
});

module.exports = router;
