import express from 'express';
import dataController from '../controller/dataController';

const router = express.Router();

router.get(`/period`, dataController.getPeriod);
router.post(`/period`, dataController.addPeriod);
router.get(`/department`, dataController.getDepartments);
router.get(`/field`, dataController.getFields);
router.get(`/meta`, dataController.getMeta);
router.get(`/work-program`, dataController.getWorkProgram);
router.get(`/work-program/:id`, dataController.getWorkProgramById);
router.post(`/period/:id/work-program`, dataController.getWorkProgramByPeriod);
router.post(`/department`, dataController.createOrUpdateDepartment);
router.post(`/field`, dataController.createOrUpdateFields);

export default router;
