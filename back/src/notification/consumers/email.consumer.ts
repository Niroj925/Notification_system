import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect } from 'amqplib';
// import * as  nodemailer from 'nodemailer';
import { EmailProvider } from '../providers/email.provider';

@Injectable()
export class EmailConsumer implements OnModuleInit {
  private channel: Channel;
  private readonly queueName = 'notification_queue';
  constructor(
    private readonly  emailProvider:EmailProvider
  ){}

  async onModuleInit() {
    const connection = await connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });

    console.log('📥 Email Consumer waiting for messages...');
    this.channel.consume(this.queueName, async (msg) => {
      if (msg) {
        const notification = JSON.parse(msg.content.toString());

        if (notification.type === 'email') {
          await this.emailProvider.sendNotification(notification.recipient, notification.message);
          this.channel.ack(msg);
        }
      }
    });
  }

  // private async sendEmail(to: string, message: string) {
  //   const transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: { user: "hamroghar531@gmail.com", pass: "gmdvskjwbphdjkor" }
  //   });

  //   await transporter.sendMail({
  //     from: '"Notification Service" <hamroghar531@gmail.com>',
  //     to,
  //     subject: 'New Notification',
  //     text: message,
  //   });

  //   console.log(`📧 Email sent to ${to}`);
  // }
}
