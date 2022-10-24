const express = require("express");
const multer = require("multer");
const fs = require("fs");

const router = express.Router();
const uploadPath = process.env.UPLOAD_PATH || "files/";
const upload = multer({ dest: uploadPath });

router.post("/", upload.single("files"), async (request, response) => {
  response.status(201).send(request.file.filename);
});

router.delete("/", async (request, response) => {
  const file = `${uploadPath}${request.body}`;
  fs.unlink(file, (err) => {
    if (err) {
      console.error(err);
      response.status(500).send("Something went wrong when uploading the file");
      return;
    }

    // File successfully removed
    response.status(202).send("File deleted");
  });
});

module.exports = router;
