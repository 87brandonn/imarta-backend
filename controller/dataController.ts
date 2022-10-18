import {
  OrganizationMeta,
  Period,
  Prisma,
  WorkProgram,
  WorkProgramDocumentation,
} from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";
import { formatSearchQuery } from "../utils/formatSearchQuery";

const getPeriod = async (req: Request, res: Response) => {
  try {
    const data = await prisma.period.findMany({
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
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPeriod = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const data = await prisma.period.create({
      data: {
        label: payload,
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getWorkProgramByPeriod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.workProgram.findMany({
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const getWorkProgram = async (req: Request, res: Response) => {
  const {
    limit = 10,
    page = 0,
    name,
    description,
    participationCount,
    collaborators,
    staffs,
    departments,
    fields,
    startDate,
    endDate,
  } = req.query;
  try {
    const where: Prisma.WorkProgramWhereInput = {
      name: {
        search: formatSearchQuery(name as string),
      },
      description: {
        search: formatSearchQuery(description as string),
      },
      participationCount: participationCount
        ? parseInt(participationCount as string, 10)
        : undefined,
      collaborators: {
        search: collaborators as string,
      },
      staffs: {
        search: staffs as string,
      },
      workProgramDepartments: departments
        ? {
            some: {
              departmentId: {
                in: (departments as string)
                  ?.split(",")
                  .map((dep) => parseInt(dep, 10)),
              },
            },
          }
        : undefined,
      workProgramFields: fields
        ? {
            some: {
              fieldId: {
                in: (fields as string)
                  ?.split(",")
                  .map((field) => parseInt(field, 10)),
              },
            },
          }
        : undefined,
      startDate: startDate
        ? {
            gte: new Date(startDate as string),
          }
        : undefined,
      endDate: endDate
        ? {
            lte: new Date(endDate as string),
          }
        : undefined,
    };

    const [data, count] = await prisma.$transaction([
      prisma.workProgram.findMany({
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
      prisma.workProgram.count({ where }),
    ]);
    res.status(200).send({
      data,
      meta: {
        count,
        page: Number(page) + 1,
        totalPage: Math.ceil(count / Number(limit)),
      },
    });
  } catch (err) {
    console.error(`[getDepartmentsError]:: `, err);
    res.status(400).send(err);
  }
};

const getDepartmentById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.department.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getMetaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.organizationMeta.findFirst({
      where: {
        id: Number(id),
      },
      include: {
        organizationMetaMissions: true,
        period: true,
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getFieldById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.field.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(400).send(err);
  }
};

const getWorkProgramById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.workProgram.findFirst({
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const getDepartments = async (req: Request, res: Response) => {
  const { limit = 10, page = 0, search } = req.query;
  try {
    const [data, count] = await prisma.$transaction([
      prisma.department.findMany({
        where: {
          name: {
            search: search
              ? (search as string).replace(/[\s\n\t]/g, "_")
              : undefined,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: Number(page) * Number(limit),
        take: Number(limit),
      }),
      prisma.department.count(),
    ]);
    res.status(200).send({
      data,
      meta: {
        count,
        page: Number(page) + 1,
        totalPage: Math.ceil(count / Number(limit)),
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const getFields = async (req: Request, res: Response) => {
  const { limit = 10, page = 0, search } = req.query;
  try {
    const [data, count] = await prisma.$transaction([
      prisma.field.findMany({
        where: {
          name: {
            search: search
              ? (search as string).replace(/[\s\n\t]/g, "_")
              : undefined,
          },
        },
        orderBy: {
          updatedAt: "desc",
        },
        skip: Number(page) * Number(limit),
        take: Number(limit),
      }),
      prisma.field.count(),
    ]);
    res.status(200).send({
      data,
      meta: {
        count,
        page: Number(page) + 1,
        totalPage: Math.ceil(count / Number(limit)),
      },
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

const createOrUpdateDepartment = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;
  try {
    const data = await prisma.department.upsert({
      where: {
        id: id || -1,
      },
      create: rest,
      update: rest,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createOrUpdateMeta = async (
  req: Request<
    unknown,
    unknown,
    OrganizationMeta & {
      missions: string[];
      period: Period;
    }
  >,
  res: Response
) => {
  const { id, periodId, missions, ...rest } = req.body;
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
      const [_, orgMeta] = await prisma.$transaction([
        prisma.organizationMetaMission.deleteMany({
          where: {
            organizationMetaId: id,
          },
        }),
        prisma.organizationMeta.findFirst({
          where: { id },
        }),
      ]);
      if (orgMeta?.periodId === periodId) {
        isPeriodSame = true;
      }
    }
    const data = await prisma.$transaction([
      prisma.organizationMeta.upsert({
        where: {
          id: id || -1,
        },
        create: {
          ...rest,
          ...processedMtoNData,
          period: {
            connect: {
              id: periodId,
            },
          },
        },
        update: {
          ...rest,
          ...processedMtoNData,
          period: isPeriodSame
            ? undefined
            : {
                connect: {
                  id: periodId,
                },
              },
        },
      }),
    ]);
    res.status(200).send(data);
  } catch (err) {
    console.error(`[createOrUpdateMetaError::] `, err);
    res.status(500).send(err);
  }
};

const createOrUpdateWorkProgam = async (
  req: Request<
    unknown,
    unknown,
    WorkProgram & {
      departments: number[];
      fields: number[];
      documentations: WorkProgramDocumentation[];
    }
  >,
  res: Response
) => {
  const { id, departments, fields, periodId, documentations, ...rest } =
    req.body;
  try {
    const processedMtoNData = {
      period: {
        connect: {
          id: periodId as number,
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
      await prisma.$transaction([
        prisma.workProgramDepartment.deleteMany({
          where: {
            workProgramId: id,
          },
        }),
        prisma.workProgramField.deleteMany({
          where: {
            workProgramId: id,
          },
        }),
        prisma.workProgramDocumentation.deleteMany({
          where: {
            workProgramId: id,
          },
        }),
      ]);
    }
    const data = await prisma.$transaction([
      prisma.workProgram.upsert({
        where: {
          id: id || -1,
        },
        create: {
          ...rest,
          ...processedMtoNData,
        },
        update: {
          ...rest,
          ...processedMtoNData,
        },
      }),
    ]);
    res.status(200).send(data);
  } catch (err) {
    console.error(`[createOrUpdateWorkProgramError::] `, err);
    res.status(500).send(err);
  }
};

const createOrUpdateFields = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;
  try {
    const data = await prisma.field.upsert({
      where: {
        id: id || -1,
      },
      create: rest,
      update: rest,
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteDepartment = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.department.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteFields = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.field.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const deleteWorkProgram = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.workProgram.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    console.error(`[deleteWorkProgramError::] `, err);
    res.status(500).send(err);
  }
};

const deleteMeta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.organizationMeta.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).send(data);
  } catch (err) {
    console.error(`[deleteMetaError::] `, err);
    res.status(500).send(err);
  }
};

const getOrganizationMeta = async (req: Request, res: Response) => {
  try {
    const data = await prisma.organizationMeta.findMany({
      include: {
        organizationMetaMissions: true,
        period: true,
      },
    });
    res.status(200).send(data);
  } catch (err) {
    console.error(`[getOrganizationMetaError::] `, err);
    res.status(500).send(err);
  }
};

export default {
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
