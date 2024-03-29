import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import prisma from './prisma';
import router from './routes';

const app: Application = express();
const port = process.env.PORT || 8002;

app.use(cors());
app.use(express.json());
app.use(`/`, router);

/** Script to migrate field and department */
// const data = await prisma.field.createMany({
//   data: prokerData.flatMap((proker) =>
//     proker['Bidang -  Ketua Bid.'].split(' | ').map((department) => {
//       const [departmentName, departmentLeader] = department.split(': ');
//       return {
//         name: departmentName,
//         leader: departmentLeader
//       };
//     })
//   ),
//   skipDuplicates: true
// });

app.post(`/migrate/image`, async (req: Request, res: Response) => {
  try {
    const data = await prisma.attribute.findMany({
      where: {
        OR: [
          {
            type: 'HERO'
          },
          {
            type: 'IMAGE_BIG'
          },
          {
            type: 'IMAGE_SMALL'
          },
          {
            type: 'IMAGE_GRID'
          },
          {
            type: 'SWIPER_NORMAL'
          },
          {
            type: 'SWIPER_CENTERED'
          }
        ]
      }
    });
    const modifiedImage = await prisma.$transaction(
      data.map((attr) =>
        prisma.attribute.update({
          where: {
            id: attr.id
          },
          data: {
            data:
              attr.type === 'IMAGE_GRID' ||
              attr.type === 'IMAGE_GRID_2' ||
              attr.type === 'SWIPER_CENTERED' ||
              attr.type === 'SWIPER_NORMAL'
                ? (attr.data as object[])?.map((imgGrid) => ({
                    ...imgGrid,
                    type: 'image'
                  }))
                : {
                    ...((attr.data as object) || {}),
                    type: 'image'
                  }
          }
        })
      )
    );
    res.status(200).send(modifiedImage);
  } catch (err) {
    console.error(`[errorImageMigrate::] `, err);
    res.status(400).send(err);
  }
});

// app.post(`/migrate/staffs`, async (req: Request, res: Response) => {
//   try {
//     const workPrograms = await prisma.workProgram.findMany();
//     const data = await prisma.$transaction(
//       workPrograms.flatMap((workProgram) =>
//         workProgram.staffs?.length
//           ? workProgram.staffs?.split(', ').map((staff, indexStaff) =>
//               prisma.workProgramStaff.create({
//                 data: {
//                   workProgram: {
//                     connect: {
//                       id: workProgram.id
//                     }
//                   },
//                   name: staff,
//                   isLead: indexStaff === 0 ? true : false
//                 }
//               })
//             )
//           : []
//       )
//     );
//     res.status(200).send(data);
//   } catch (err) {
//     console.error(`[errorMigrateStaffs]:: `, err);
//     res.status(400).send('Something went wrong');
//   }
// });

app.post(
  `/migrate`,
  async (
    req: Request<
      unknown,
      unknown,
      {
        'No.': number;
        'Program Kerja': string;
        Periode: string;
        Tanggal: string;
        Jumlah: string;
        'Deskripsi Program Kerja': string;
        'Kolaborator, Mentor, atau Pembicara': string;
        'Departemen -  Ketua Dept.': string;
        'Bidang -  Ketua Bid.': string;
        Pengurus: string;
        'Link Dokumentasi': string;
        Column14: string;
        Column13: string;
      }[]
    >,
    res: Response
  ) => {
    const prokerData = req.body;
    try {
      const [departmentData, periodData, fieldData] = await prisma.$transaction(
        [
          prisma.department.findMany(),
          prisma.period.findMany(),
          prisma.field.findMany()
        ]
      );

      const mappedPeriodData = Object.fromEntries(
        periodData.map((period) => [period.label, period.id])
      );

      const mappedFieldData = Object.fromEntries(
        fieldData.map((period) => [period.name, period.id])
      );

      const mappedDepartmentData = Object.fromEntries(
        departmentData.map((period) => [period.name, period.id])
      );

      const isDate = function (date: any) {
        return date instanceof Date && !Number.isNaN(date);
      };

      const data = await Promise.all(
        prokerData.map((proker) => {
          const processedDepartmentData = [];
          const processedFieldData = [];

          const departmentData =
            proker['Departemen -  Ketua Dept.'].split(' | ');

          const fieldData = proker['Bidang -  Ketua Bid.'].split(' | ');

          for (let i = 0; i < departmentData.length; i += 1) {
            processedDepartmentData.push({
              departmentId:
                mappedDepartmentData[departmentData[i].split(': ')[0]]
            });
          }

          for (let i = 0; i < fieldData.length; i += 1) {
            if (mappedFieldData[fieldData[i].split(': ')[0]]) {
              processedFieldData.push({
                fieldId: mappedFieldData[fieldData[i].split(': ')[0]]
              });
            }
          }

          // return {
          //   processedDepartmentData,
          //   processedFieldData
          // };

          return prisma.workProgram.create({
            data: {
              name: proker['Program Kerja'],
              collaborators: proker['Kolaborator, Mentor, atau Pembicara'],
              // staffs: proker.Pengurus,
              startDate: isDate(proker.Tanggal.split(' - ')[0])
                ? new Date(proker.Tanggal.split(' - ')[0])
                : undefined,
              endDate: isDate(proker.Tanggal.split(' - ')[1])
                ? new Date(proker.Tanggal.split(' - ')[1])
                : undefined,
              participationCount: proker.Jumlah.split(' Peserta')?.[0],
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
        })
      );

      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  }
);

app.listen(port, () => console.log(`Server is listening on port ${port}!`));
