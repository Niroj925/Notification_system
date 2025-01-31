import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Channel, Connection, connect } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit, OnModuleDestroy {
  private connection: Connection;
  private channel: Channel;
  private readonly queueName = 'notification_queue';

  async onModuleInit() {
    this.connection = await connect('amqp://localhost');
    this.channel = await this.connection.createChannel();
    await this.channel.assertQueue(this.queueName, { durable: true });
  }

  async publishMessage(message: any) {
    this.channel.sendToQueue(this.queueName, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    console.log(`📤 Message sent: ${JSON.stringify(message)}`);
  }

  async onModuleDestroy() {
    await this.channel.close();
    await this.connection.close();
  }
}
