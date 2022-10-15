"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moduleRouter_1 = __importDefault(require("./moduleRouter"));
const mediaRouter_1 = __importDefault(require("./mediaRouter"));
const dataRouter_1 = __importDefault(require("./dataRouter"));
const router = express_1.default.Router();
router.use('/module', moduleRouter_1.default);
router.use('/data', dataRouter_1.default);
router.use('/media', mediaRouter_1.default);
exports.default = router;
