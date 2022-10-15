import { format } from 'util';
import { Request, Response } from 'express';
import { Storage } from '@google-cloud/storage';
import * as path from 'path';

const dirname = path.resolve();
const filePath = path.join(
  dirname,
  '/credentials/imarta-firebase-adminsdk-ynh5i-68d8eabdb0.json'
);
const storage = new Storage({
  keyFilename: filePath
});
const bucket = storage.bucket('imarta-main');

const postImage = async (req: Request, res: Response) => {
  const file = req.file;

  try {
    if (!file) {
      return res.status(400).send({ message: 'Please upload a file!' });
    }

    file.originalname = `${new Date().toISOString()}-${file.originalname.replace(
      /\s+/g,
      ''
    )}`;

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false
    });

    blobStream.on('error', (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async () => {
      // Create URL for directly file access via HTTP.
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );

      try {
        // Make the file public
        await bucket.file(file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `Uploaded the file successfully: ${file.originalname}, but public access is denied!`,
          url: publicUrl
        });
      }

      res.status(200).send({
        message: `Uploaded the file successfully: ${file.originalname}`,
        url: publicUrl
      });
    });

    blobStream.end(file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${file?.originalname}. ${err}`
    });
  }
};

export { postImage };
