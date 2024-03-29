import express from 'express';
import dataController from '../controller/dataController';

const router = express.Router();

router.get(`/period`, dataController.getPeriod);
router.get(`/department`, dataController.getDepartments);
router.get(
  `/department/:id/work-program`,
  dataController.getWorkProgramByDepartmentId
);
router.get(`/department/:id`, dataController.getDepartmentById);
router.get(`/field/:id`, dataController.getFieldById);
router.get(`/field`, dataController.getFields);
router.get(`/meta`, dataController.getOrganizationMeta);
router.get(`/work-program/all`, dataController.getAllWorkProgram);
router.get(`/work-program`, dataController.getWorkProgram);
router.get(
  `/work-program-documentations`,
  dataController.getWorkProgramDocumentations
);
router.get(
  `/work-program/:id/documentation`,
  dataController.getWorkProgramDocumentationsByWorkProgramId
);
router.post(
  `/work-program/:id/documentation`,
  dataController.addWorkProgramDocumentation
);
router.get(`/documentation/:id`, dataController.getDocumentationById);
router.get(`/work-program/:id`, dataController.getWorkProgramById);
router.get(`/meta/:id`, dataController.getMetaById);
router.get(`/period/:id/work-program`, dataController.getWorkProgramByPeriod);
router.get(`/period/:id/department`, dataController.getDepartmentsByPeriod);
router.get(`/period/:id`, dataController.getPeriodById);
router.post(`/work-program`, dataController.createOrUpdateWorkProgam);
router.post(`/department`, dataController.createOrUpdateDepartment);
router.post(`/period`, dataController.createOrUpdatePeriod);
router.post(`/field`, dataController.createOrUpdateFields);
router.post(`/meta`, dataController.createOrUpdateMeta);
router.delete(`/work-program/:id`, dataController.deleteWorkProgram);
router.delete(`/period/:id`, dataController.deletePeriod);
router.delete(`/department/:id`, dataController.deleteDepartment);
router.delete(`/meta/:id`, dataController.deleteMeta);
router.delete(`/field/:id`, dataController.deleteFields);

export default router;
