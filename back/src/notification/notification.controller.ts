import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('send')
  async sendNotification(@Body() data: CreateNotificationDto) {
    return this.notificationService.sendNotification(data);
  }
}
