"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const getAllModule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.module.findMany();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const getModuleBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    try {
        const data = yield prisma_1.default.module.findFirst({
            where: {
                slug
            },
            include: {
                sections: {
                    include: {
                        attributes: true
                    }
                }
            }
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const updateModuleAttributes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const data = req.body;
    try {
        const attributes = yield prisma_1.default.attribute.update({
            where: {
                id: Number(id)
            },
            data: {
                data
            }
        });
        res.status(200).send(attributes);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const addModules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const data = yield prisma_1.default.module.createMany({
            data: payload
        });
        return res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const addSections = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const data = yield prisma_1.default.section.createMany({
            data: payload
        });
        return res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const addAtributes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const payload = req.body;
    try {
        const data = yield prisma_1.default.$transaction(payload.map((attribute) => prisma_1.default.attribute.create({
            data: {
                sectionId: Number(id),
                name: attribute.name,
                label: attribute.label,
                type: attribute.type
            }
        })));
        return res.status(200).send(data);
    }
    catch (err) {
        console.error(`[addAttributesError] `, err);
        res.status(500).send(err);
    }
});
exports.default = {
    getAllModule,
    getModuleBySlug,
    updateModuleAttributes,
    addModules,
    addSections,
    addAtributes
};
