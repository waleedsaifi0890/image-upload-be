import { Injectable } from '@nestjs/common';
import { ReadStream } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { S3 } from 'aws-sdk';

@Injectable()
export class ImageUploadService {
  AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME;
  s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.REGION,
  });

  async uploadFile(file) {
    const fileBuffer = await this.streamToBuffer(file.createReadStream());
    const uniqueFilename = `${uuidv4()}-${file.filename}`;
    const data = await this.s3_upload(
      fileBuffer,
      this.AWS_S3_BUCKET,
      uniqueFilename,
      file.mimetype,
    );
    return data;
  }

  async s3_upload(file, bucket, name, mimetype) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'eu-west-1',
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();

      return s3Response;
    } catch (e) {
      console.log(e);
    }
  }

  async streamToBuffer(stream: ReadStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });
      stream.on('error', (error: Error) => {
        reject(error);
      });
      stream.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });
  }
}
