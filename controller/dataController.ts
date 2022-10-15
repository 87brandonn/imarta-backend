import { AttributeType } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';

const getPeriod = async (req: Request, res: Response) => {
  try {
    const data = await prisma.period.findMany({
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
  } catch (err) {
    res.status(500).send(err);
  }
};

const addPeriod = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const data = await prisma.period.create({
      data: {
        label: payload
      }
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const getWorkProgram = async (req: Request, res: Response) => {
  try {
    const data = await prisma.workProgram.findMany({
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const getWorkProgramById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await prisma.workProgram.findFirst({
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
  } catch (err) {
    res.status(400).send(err);
  }
};

const getMeta = async (req: Request, res: Response) => {
  try {
    const data = await prisma.organizationMeta.findMany({
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
  } catch (err) {
    res.status(500).send(err);
  }
};

const getDepartments = async (req: Request, res: Response) => {
  try {
    const data = await prisma.department.findMany();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getFields = async (req: Request, res: Response) => {
  try {
    const data = await prisma.field.findMany();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createOrUpdateDepartment = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;
  try {
    const data = await prisma.department.upsert({
      where: {
        id: id || -1
      },
      create: rest,
      update: rest
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const createOrUpdateFields = async (req: Request, res: Response) => {
  const { id, ...rest } = req.body;
  try {
    const data = await prisma.field.upsert({
      where: {
        id: id || -1
      },
      create: rest,
      update: rest
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

export default {
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
