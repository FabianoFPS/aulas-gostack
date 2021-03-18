"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _mime = _interopRequireDefault(require("mime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DiskStorageProvider {
  constructor() {
    this.client = void 0;
    this.BUCKET = _upload.default.config.aws.bucket;
    this.client = new _awsSdk.default.S3({
      region: 'us-east-1'
    });
  }

  async saveFile(file) {
    const originalPath = _path.default.resolve(_upload.default.tmpFolder, file);

    const ContentType = _mime.default.getType(originalPath);

    const fileContent = await _fs.default.promises.readFile(originalPath);
    if (!ContentType) throw new Error('file not found');
    await this.client.putObject({
      Bucket: this.BUCKET,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
      ContentDisposition: `inline; filename=${file}`
    }).promise();
    await _fs.default.promises.unlink(originalPath);
    return file;
  }

  async deleteFile(file) {
    await this.client.deleteObject({
      Bucket: this.BUCKET,
      Key: file
    }).promise();
  }

}

exports.default = DiskStorageProvider;