import express from 'express';
import moduleController from '../controller/moduleController';

const router = express.Router();

router.get(`/`, moduleController.getAllModule);
router.get(`/:slug`, moduleController.getModuleBySlug);
router.post(`/`, moduleController.addModules);
router.post(`/section`, moduleController.addSections);
router.post(`/section/:id/attribute`, moduleController.addAtributes);
router.put(`/section/attribute/:id`, moduleController.updateModuleAttributes);

export default router;
