import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import mime from 'mime';

export default class DiskStorageProvider implements IStorageProvider {
  private client: S3;

  private BUCKET = uploadConfig.config.aws.bucket;

  constructor() {
    this.client = new aws.S3({
      region: 'us-east-1',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);
    const ContentType = mime.getType(originalPath);
    const fileContent = await fs.promises.readFile(originalPath);

    if (!ContentType) throw new Error('file not found');

    await this.client
      .putObject({
        Bucket: this.BUCKET,
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
        ContentType,
        ContentDisposition: `inline; filename=${file}`,
      })
      .promise();

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: this.BUCKET,
        Key: file,
      })
      .promise();
  }
}
