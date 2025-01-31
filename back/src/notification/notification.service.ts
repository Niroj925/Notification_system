import { Injectable } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq/rabbitmq.service';
import { CreateNotificationDto } from './dto/notification.dto';
@Injectable()
export class NotificationService {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  async sendNotification(data: CreateNotificationDto) {
   const notinfo= await this.rabbitMQService.publishMessage(data);
   console.log('notification info:',notinfo);
    return { success: true, message: 'Notification queued successfully' };
  }
}
