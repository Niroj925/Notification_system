import { ForbiddenException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailProvider {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
  }
  });

  async sendNotification(to: string, message: string): Promise<void> {
  const mailOptions = {
      from: "hamroghar531@gmail.com",
      to,
      subject: 'New Notification',
      text: message,
  };

  // Send the email
 this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log(error);
          throw new ForbiddenException(error.message)
      } else {
          console.log(`📧 Email sent to ${to}:` + info.response);
      }
  });
  }
}
