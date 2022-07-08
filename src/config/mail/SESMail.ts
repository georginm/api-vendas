import { mail } from '@config/mail/mail';
import aws from 'aws-sdk';
import nodemailer from 'nodemailer';

import { HandleBarsMailTemplate } from './HandlebarsMailTemplate';
import { IParseMailTemplate } from './IParseMailTemplate';

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class SESMail {
  static async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
    const mailTemplate = new HandleBarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        credentials: {
          accessKeyId: `${process.env.AWS_ACCESS_KEY_ID}`,
          secretAccessKey: `${process.env.AWS_SECRET_ACESS_KEY}`,
        },
        region: process.env.AWS_REGION,
      }),
    });

    const { email, name } = mail.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to?.name || 'Equipe API Vendas',
        address: to?.email || 'equipe@apivendas.com.br',
      },
      subject,
      html: await mailTemplate.parse(templateData),
    });
  }
}

export { SESMail };
