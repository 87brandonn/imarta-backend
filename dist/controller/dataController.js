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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../prisma"));
const formatSearchQuery_1 = require("../utils/formatSearchQuery");
const getPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.period.findMany({
            include: {
                workPrograms: {
                    include: {
                        workProgramDepartments: {
                            include: {
                                department: true,
                            },
                        },
                        workProgramFields: {
                            include: {
                                field: true,
                            },
                        },
                    },
                },
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const addPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const data = yield prisma_1.default.period.create({
            data: {
                label: payload,
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const getWorkProgramByPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.workProgram.findMany({
            where: {
                period: {
                    id: Number(id),
                },
            },
            include: {
                workProgramDepartments: {
                    include: {
                        department: true,
                    },
                },
                workProgramFields: {
                    include: {
                        field: true,
                    },
                },
                workProgramDocumentations: true,
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getWorkProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 0, name, description, participationCount, collaborators, staffs, departments, fields, startDate, endDate, } = req.query;
    try {
        const where = {
            name: {
                search: (0, formatSearchQuery_1.formatSearchQuery)(name),
            },
            description: {
                search: (0, formatSearchQuery_1.formatSearchQuery)(description),
            },
            participationCount: participationCount
                ? parseInt(participationCount, 10)
                : undefined,
            collaborators: {
                search: collaborators,
            },
            staffs: {
                search: staffs,
            },
            workProgramDepartments: departments
                ? {
                    some: {
                        departmentId: {
                            in: departments === null || departments === void 0 ? void 0 : departments.split(",").map((dep) => parseInt(dep, 10)),
                        },
                    },
                }
                : undefined,
            workProgramFields: fields
                ? {
                    some: {
                        fieldId: {
                            in: fields === null || fields === void 0 ? void 0 : fields.split(",").map((field) => parseInt(field, 10)),
                        },
                    },
                }
                : undefined,
            startDate: startDate
                ? {
                    gte: new Date(startDate),
                }
                : undefined,
            endDate: endDate
                ? {
                    lte: new Date(endDate),
                }
                : undefined,
        };
        const [data, count] = yield prisma_1.default.$transaction([
            prisma_1.default.workProgram.findMany({
                where,
                orderBy: {
                    updatedAt: "desc",
                },
                skip: Number(page) * Number(limit),
                take: Number(limit),
                include: {
                    workProgramDepartments: {
                        include: {
                            department: true,
                        },
                    },
                    workProgramDocumentations: true,
                    period: true,
                    workProgramFields: {
                        include: {
                            field: true,
                        },
                    },
                },
            }),
            prisma_1.default.workProgram.count({ where }),
        ]);
        res.status(200).send({
            data,
            meta: {
                count,
                page: Number(page) + 1,
                totalPage: Math.ceil(count / Number(limit)),
            },
        });
    }
    catch (err) {
        console.error(`[getDepartmentsError]:: `, err);
        res.status(400).send(err);
    }
});
const getDepartmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.department.findFirst({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getMetaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.organizationMeta.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                organizationMetaMissions: true,
                period: true,
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getFieldById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.field.findFirst({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getWorkProgramById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.workProgram.findFirst({
            where: {
                id: Number(id),
            },
            include: {
                workProgramDepartments: {
                    include: {
                        department: true,
                    },
                },
                workProgramDocumentations: true,
                workProgramFields: {
                    include: {
                        field: true,
                    },
                },
                period: true,
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 0, search } = req.query;
    try {
        const [data, count] = yield prisma_1.default.$transaction([
            prisma_1.default.department.findMany({
                where: {
                    name: {
                        search: search
                            ? search.replace(/[\s\n\t]/g, "_")
                            : undefined,
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
                skip: Number(page) * Number(limit),
                take: Number(limit),
            }),
            prisma_1.default.department.count(),
        ]);
        res.status(200).send({
            data,
            meta: {
                count,
                page: Number(page) + 1,
                totalPage: Math.ceil(count / Number(limit)),
            },
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit = 10, page = 0, search } = req.query;
    try {
        const [data, count] = yield prisma_1.default.$transaction([
            prisma_1.default.field.findMany({
                where: {
                    name: {
                        search: search
                            ? search.replace(/[\s\n\t]/g, "_")
                            : undefined,
                    },
                },
                orderBy: {
                    updatedAt: "desc",
                },
                skip: Number(page) * Number(limit),
                take: Number(limit),
            }),
            prisma_1.default.field.count(),
        ]);
        res.status(200).send({
            data,
            meta: {
                count,
                page: Number(page) + 1,
                totalPage: Math.ceil(count / Number(limit)),
            },
        });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const createOrUpdateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
    try {
        const data = yield prisma_1.default.department.upsert({
            where: {
                id: id || -1,
            },
            create: rest,
            update: rest,
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const createOrUpdateMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { id, periodId, missions } = _b, rest = __rest(_b, ["id", "periodId", "missions"]);
    try {
        let processedMtoNData = {
            organizationMetaMissions: {
                createMany: {
                    data: missions.map((mission, i) => ({
                        number: i + 1,
                        value: mission,
                    })),
                },
            },
        };
        let isPeriodSame = false;
        if (id) {
            const [_, orgMeta] = yield prisma_1.default.$transaction([
                prisma_1.default.organizationMetaMission.deleteMany({
                    where: {
                        organizationMetaId: id,
                    },
                }),
                prisma_1.default.organizationMeta.findFirst({
                    where: { id },
                }),
            ]);
            if ((orgMeta === null || orgMeta === void 0 ? void 0 : orgMeta.periodId) === periodId) {
                isPeriodSame = true;
            }
        }
        const data = yield prisma_1.default.$transaction([
            prisma_1.default.organizationMeta.upsert({
                where: {
                    id: id || -1,
                },
                create: Object.assign(Object.assign(Object.assign({}, rest), processedMtoNData), { period: {
                        connect: {
                            id: periodId,
                        },
                    } }),
                update: Object.assign(Object.assign(Object.assign({}, rest), processedMtoNData), { period: isPeriodSame
                        ? undefined
                        : {
                            connect: {
                                id: periodId,
                            },
                        } }),
            }),
        ]);
        res.status(200).send(data);
    }
    catch (err) {
        console.error(`[createOrUpdateMetaError::] `, err);
        res.status(500).send(err);
    }
});
const createOrUpdateWorkProgam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _c = req.body, { id, departments, fields, periodId, documentations } = _c, rest = __rest(_c, ["id", "departments", "fields", "periodId", "documentations"]);
    try {
        const processedMtoNData = {
            period: {
                connect: {
                    id: periodId,
                },
            },
            workProgramDepartments: {
                createMany: {
                    data: departments.map((dep) => ({
                        departmentId: dep,
                    })),
                },
            },
            workProgramFields: {
                createMany: {
                    data: fields.map((field) => ({
                        fieldId: field,
                    })),
                },
            },
            workProgramDocumentations: {
                createMany: {
                    data: documentations.map((docu) => ({
                        imgUrl: docu.imgUrl,
                    })),
                },
            },
        };
        if (id) {
            yield prisma_1.default.$transaction([
                prisma_1.default.workProgramDepartment.deleteMany({
                    where: {
                        workProgramId: id,
                    },
                }),
                prisma_1.default.workProgramField.deleteMany({
                    where: {
                        workProgramId: id,
                    },
                }),
                prisma_1.default.workProgramDocumentation.deleteMany({
                    where: {
                        workProgramId: id,
                    },
                }),
            ]);
        }
        const data = yield prisma_1.default.$transaction([
            prisma_1.default.workProgram.upsert({
                where: {
                    id: id || -1,
                },
                create: Object.assign(Object.assign({}, rest), processedMtoNData),
                update: Object.assign(Object.assign({}, rest), processedMtoNData),
            }),
        ]);
        res.status(200).send(data);
    }
    catch (err) {
        console.error(`[createOrUpdateWorkProgramError::] `, err);
        res.status(500).send(err);
    }
});
const createOrUpdateFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _d = req.body, { id } = _d, rest = __rest(_d, ["id"]);
    try {
        const data = yield prisma_1.default.field.upsert({
            where: {
                id: id || -1,
            },
            create: rest,
            update: rest,
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const deleteDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.department.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const deleteFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.field.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const deleteWorkProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.workProgram.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        console.error(`[deleteWorkProgramError::] `, err);
        res.status(500).send(err);
    }
});
const deleteMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield prisma_1.default.organizationMeta.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        console.error(`[deleteMetaError::] `, err);
        res.status(500).send(err);
    }
});
const getOrganizationMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.organizationMeta.findMany({
            include: {
                organizationMetaMissions: true,
                period: true,
            },
        });
        res.status(200).send(data);
    }
    catch (err) {
        console.error(`[getOrganizationMetaError::] `, err);
        res.status(500).send(err);
    }
});
exports.default = {
    getPeriod,
    getOrganizationMeta,
    addPeriod,
    getWorkProgramByPeriod,
    getWorkProgramById,
    getDepartmentById,
    getMetaById,
    getFieldById,
    getWorkProgram,
    createOrUpdateDepartment,
    createOrUpdateWorkProgam,
    createOrUpdateMeta,
    createOrUpdateFields,
    deleteDepartment,
    deleteFields,
    deleteMeta,
    deleteWorkProgram,
    getDepartments,
    getFields,
};
