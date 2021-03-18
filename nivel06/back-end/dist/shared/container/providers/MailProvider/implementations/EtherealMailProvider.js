"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _tsyringe = require("tsyringe");

var _debug = require("debug");

var _AppError = _interopRequireDefault(require("../../../../errors/AppError"));

var _IMailtemplateProvider = _interopRequireDefault(require("../../MailTemplateProvider/models/IMailtemplateProvider"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailPorvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('RgMailTemplateProvider')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IMailtemplateProvider.default === "undefined" ? Object : _IMailtemplateProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class EtherealMailPorvider {
  constructor(mailTemplateProvider) {
    this.mailTemplateProvider = mailTemplateProvider;
    this.client = void 0;

    _nodemailer.default.createTestAccount().then(account => {
      const transporter = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    }).catch(err => {
      throw new _AppError.default('Create nodemailer', err.message);
    });
  }

  async sendMail({
    to,
    from,
    subject,
    templateData
  }) {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe GoBarber',
        address: from?.email || 'equipe@gobarber.com.br'
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    });
    (0, _debug.log)('Message sent: %s', message.messageId);
    (0, _debug.log)(`Preview URL: ${_nodemailer.default.getTestMessageUrl(message)}`);
  }

}) || _class) || _class) || _class) || _class);
exports.default = EtherealMailPorvider;