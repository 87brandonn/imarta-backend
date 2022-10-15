"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const mediaController_1 = require("../controller/mediaController");
const upload = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
const router = express_1.default.Router();
router.post('/', upload.single('image'), mediaController_1.postImage);
exports.default = router;
