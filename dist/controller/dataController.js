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
const getPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.period.findMany({
            include: {
                workPrograms: {
                    include: {
                        workProgramDepartments: {
                            include: {
                                department: true
                            }
                        },
                        workProgramFields: {
                            include: {
                                field: true
                            }
                        }
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
const addPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    try {
        const data = yield prisma_1.default.period.create({
            data: {
                label: payload
            }
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
                    id: Number(id)
                }
            },
            include: {
                workProgramDepartments: {
                    include: {
                        department: true
                    }
                },
                workProgramFields: {
                    include: {
                        field: true
                    }
                }
            }
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getWorkProgram = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.workProgram.findMany({
            include: {
                workProgramDepartments: {
                    include: {
                        department: true
                    }
                },
                WorkProgramDocumentation: true,
                period: true,
                workProgramFields: {
                    include: {
                        field: true
                    }
                }
            }
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
                id: Number(id)
            },
            include: {
                workProgramDepartments: {
                    include: {
                        department: true
                    }
                },
                WorkProgramDocumentation: true,
                workProgramFields: {
                    include: {
                        field: true
                    }
                },
                period: true
            }
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
const getMeta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.organizationMeta.findMany({
            orderBy: {
                period: {
                    label: 'desc'
                }
            },
            take: 3,
            include: {
                organizationMetaMissions: true
            }
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const getDepartments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.department.findMany();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const getFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.field.findMany();
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const createOrUpdateDepartment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { id } = _a, rest = __rest(_a, ["id"]);
    try {
        const data = yield prisma_1.default.department.upsert({
            where: {
                id: id || -1
            },
            create: rest,
            update: rest
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
const createOrUpdateFields = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { id } = _b, rest = __rest(_b, ["id"]);
    try {
        const data = yield prisma_1.default.field.upsert({
            where: {
                id: id || -1
            },
            create: rest,
            update: rest
        });
        res.status(200).send(data);
    }
    catch (err) {
        res.status(500).send(err);
    }
});
exports.default = {
    getPeriod,
    getMeta,
    addPeriod,
    getWorkProgramByPeriod,
    getWorkProgramById,
    getWorkProgram,
    createOrUpdateDepartment,
    createOrUpdateFields,
    getDepartments,
    getFields
};
