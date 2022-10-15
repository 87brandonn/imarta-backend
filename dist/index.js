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
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./prisma"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8002;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(`/`, routes_1.default);
app.post(`/migrate`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prokerData = req.body;
    try {
        const [departmentData, periodData, fieldData] = yield prisma_1.default.$transaction([
            prisma_1.default.department.findMany(),
            prisma_1.default.period.findMany(),
            prisma_1.default.field.findMany()
        ]);
        const mappedPeriodData = Object.fromEntries(periodData.map((period) => [period.label, period.id]));
        const mappedFieldData = Object.fromEntries(fieldData.map((period) => [period.name, period.id]));
        const mappedDepartmentData = Object.fromEntries(departmentData.map((period) => [period.name, period.id]));
        const isDate = function (date) {
            return date instanceof Date && !Number.isNaN(date);
        };
        const data = yield Promise.all(prokerData.map((proker) => __awaiter(void 0, void 0, void 0, function* () {
            const processedDepartmentData = [];
            const processedFieldData = [];
            const departmentData = proker['Departemen -  Ketua Dept.'].split(' | ');
            const fieldData = proker['Bidang -  Ketua Bid.'].split(' | ');
            for (let i = 0; i < departmentData.length; i += 1) {
                processedDepartmentData.push({
                    departmentId: mappedDepartmentData[departmentData[i].split(': ')[0]]
                });
            }
            for (let i = 0; i < fieldData.length; i += 1) {
                if (mappedFieldData[fieldData[i].split(': ')[0]]) {
                    processedFieldData.push({
                        fieldId: mappedFieldData[fieldData[i].split(': ')[0]]
                    });
                }
            }
            return yield prisma_1.default.workProgram.create({
                data: {
                    name: proker['Program Kerja'],
                    collaborators: proker['Kolaborator, Mentor, atau Pembicara'],
                    staffs: proker.Pengurus,
                    startDate: isDate(proker.Tanggal.split(' - ')[0])
                        ? new Date(proker.Tanggal.split(' - ')[0])
                        : undefined,
                    endDate: isDate(proker.Tanggal.split(' - ')[1])
                        ? new Date(proker.Tanggal.split(' - ')[1])
                        : undefined,
                    participationCount: Number.isNaN(parseInt(proker.Jumlah.split(' Peserta')[0], 10))
                        ? 0
                        : parseInt(proker.Jumlah.split(' Peserta')[0], 10),
                    periodId: mappedPeriodData[proker.Periode],
                    workProgramDepartments: {
                        createMany: {
                            data: processedDepartmentData
                        }
                    },
                    workProgramFields: {
                        createMany: {
                            data: processedFieldData
                        }
                    },
                    description: proker['Deskripsi Program Kerja']
                }
            });
        })));
        res.status(200).send(data);
    }
    catch (err) {
        console.error(err);
        res.status(500);
    }
}));
app.listen(port, () => console.log(`Server is listening on port ${port}!`));
