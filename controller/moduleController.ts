import { AttributeType } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../prisma";

const getAllModule = async (req: Request, res: Response) => {
  try {
    const data = await prisma.module.findMany();
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const getModuleBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  try {
    const data = await prisma.module.findFirst({
      where: {
        slug,
      },
      include: {
        sections: {
          include: {
            attributes: true,
          },
        },
      },
    });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const updateModuleAttributes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;

  try {
    const attributes = await prisma.attribute.update({
      where: {
        id: Number(id),
      },
      data: {
        data,
      },
    });

    res.status(200).send(attributes);
  } catch (err) {
    console.error(`[updateModuleAttributesError::] `, err);
    res.status(500).send(err);
  }
};

const addModules = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const data = await prisma.module.createMany({
      data: payload,
    });
    return res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addSections = async (req: Request, res: Response) => {
  const payload = req.body;
  try {
    const data = await prisma.section.createMany({
      data: payload,
    });
    return res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addAtributes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const data = await prisma.$transaction(
      payload.map(
        (attribute: { name: string; label: string; type: AttributeType }) =>
          prisma.attribute.create({
            data: {
              sectionId: Number(id),
              name: attribute.name,
              label: attribute.label,
              type: attribute.type,
            },
          })
      )
    );
    return res.status(200).send(data);
  } catch (err) {
    console.error(`[addAttributesError] `, err);
    res.status(500).send(err);
  }
};

export default {
  getAllModule,
  getModuleBySlug,
  updateModuleAttributes,
  addModules,
  addSections,
  addAtributes,
};
