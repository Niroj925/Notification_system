import { Injectable, OnModuleInit } from '@nestjs/common';
import { Channel, connect } from 'amqplib';
import twilio from 'twilio';

const twilioClient = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');
@Injectable()
export class SmsConsumer implements OnModuleInit {
  private channel: Channel;
  private readonly queueName = 'notification_queue';

  async onModuleInit() {
    const connection = await connect('amqp://localhost');
    this.channel = await connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });

    console.log('📥 SMS Consumer waiting for messages...');
    this.channel.consume(this.queueName, async (msg) => {
      if (msg) {
        const notification = JSON.parse(msg.content.toString());

        if (notification.type === 'sms') {
          await this.sendSMS(notification.recipient, notification.message);
          this.channel.ack(msg);
        }
      }
    });
  }

  private async sendSMS(to: string, message: string) {
    await twilioClient.messages.create({
      body: message,
      from: '+1234567890',
      to,
    });

    console.log(`📲 SMS sent to ${to}`);
  }
}
