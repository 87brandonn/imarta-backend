"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postImage = void 0;
const util_1 = require("util");
const storage_1 = require("@google-cloud/storage");
const path = __importStar(require("path"));
const dirname = path.resolve();
const filePath = path.join(dirname, '/credentials/imarta-firebase-adminsdk-ynh5i-68d8eabdb0.json');
const storage = new storage_1.Storage({
    keyFilename: filePath
});
const bucket = storage.bucket('imarta-main');
const postImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    try {
        if (!file) {
            return res.status(400).send({ message: 'Please upload a file!' });
        }
        file.originalname = `${new Date().toISOString()}-${file.originalname.replace(/\s+/g, '')}`;
        // Create a new blob in the bucket and upload the file data.
        const blob = bucket.file(file.originalname);
        const blobStream = blob.createWriteStream({
            resumable: false
        });
        blobStream.on('error', (err) => {
            res.status(500).send({ message: err.message });
        });
        blobStream.on('finish', () => __awaiter(void 0, void 0, void 0, function* () {
            // Create URL for directly file access via HTTP.
            const publicUrl = (0, util_1.format)(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
            try {
                // Make the file public
                yield bucket.file(file.originalname).makePublic();
            }
            catch (_a) {
                return res.status(500).send({
                    message: `Uploaded the file successfully: ${file.originalname}, but public access is denied!`,
                    url: publicUrl
                });
            }
            res.status(200).send({
                message: `Uploaded the file successfully: ${file.originalname}`,
                url: publicUrl
            });
        }));
        blobStream.end(file.buffer);
    }
    catch (err) {
        res.status(500).send({
            message: `Could not upload the file: ${file === null || file === void 0 ? void 0 : file.originalname}. ${err}`
        });
    }
});
exports.postImage = postImage;
