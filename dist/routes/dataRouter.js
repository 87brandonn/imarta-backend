"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataController_1 = __importDefault(require("../controller/dataController"));
const router = express_1.default.Router();
router.get(`/period`, dataController_1.default.getPeriod);
router.post(`/period`, dataController_1.default.addPeriod);
router.get(`/department`, dataController_1.default.getDepartments);
router.get(`/field`, dataController_1.default.getFields);
router.get(`/meta`, dataController_1.default.getMeta);
router.get(`/work-program`, dataController_1.default.getWorkProgram);
router.get(`/work-program/:id`, dataController_1.default.getWorkProgramById);
router.post(`/period/:id/work-program`, dataController_1.default.getWorkProgramByPeriod);
router.post(`/department`, dataController_1.default.createOrUpdateDepartment);
router.post(`/field`, dataController_1.default.createOrUpdateFields);
exports.default = router;
