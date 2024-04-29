import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor() {}

  sendEmailByNodemailer(content = `<h1>验证码: ${Math.random()}</h1>`) {
    console.log('nodemailerjll', nodemailer);
    const transporter = nodemailer.createTransport({
      pool: true,
      host: 'smtp.qq.com', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
      port: 465, // SMTP 端口
      secure: true, // 使用了 SSL
      auth: {
        user: '2406790623@qq.com', //邮箱账号
        pass: 'tqkzgdlufasediec', // 不是邮箱密码，是你设置的smtp授权码
      },
    });

    const mailOptions = {
      from: `2406790623@qq.com`, // 发送者 邮件地址
      to: `2406790623@qq.com, g13760625815@gmail.com`, // 逗号隔开的接收人列表
      subject: `验证码`, // 邮件标题
      // 发送text或者html格式
      // text: 'Hello world?', // plain text body
      // 发送的html内容
      html: content,
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('error', error);
      }
      console.log('Message sent: %s', info.messageId);
      console.log(info);
    });
  }

  async sendEmail(dto: Record<string, any>) {
    console.log('dto', dto);
    this.sendEmailByNodemailer();
    return Promise.resolve().then(() => {
      return {
        msg: '',
      };
    });
  }
}
