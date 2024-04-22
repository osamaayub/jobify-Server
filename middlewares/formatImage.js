const multer = require("multer");
const Datauri = require("datauri/parser");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage });
const parser = new Datauri();

const fileuploadImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();
    const content = parser.format(fileExtension, file.buffer);
    return content;
}

module.exports = upload;
