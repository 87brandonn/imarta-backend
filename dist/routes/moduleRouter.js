"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const moduleController_1 = __importDefault(require("../controller/moduleController"));
const router = express_1.default.Router();
router.get(`/`, moduleController_1.default.getAllModule);
router.get(`/:slug`, moduleController_1.default.getModuleBySlug);
router.post(`/`, moduleController_1.default.addModules);
router.post(`/section`, moduleController_1.default.addSections);
router.post(`/section/:id/attribute`, moduleController_1.default.addAtributes);
router.put(`/section/attribute/:id`, moduleController_1.default.updateModuleAttributes);
exports.default = router;
