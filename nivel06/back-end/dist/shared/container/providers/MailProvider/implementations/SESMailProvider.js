"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _mail = _interopRequireDefault(require("../../../../../config/mail"));

var _IMailtemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailtemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RgMailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailtemplateProvider.default === "undefined" ? Object : _IMailtemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class SESMailProvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.default.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_DEFAULT_REGION
      })
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const {
      email,
      name
    } = _mail.default.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
  }

}) || _class) || _class) || _class) || _class);
exports.default = SESMailProvider;