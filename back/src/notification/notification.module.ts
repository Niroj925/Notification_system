import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { EmailConsumer } from './consumers/email.consumer';
// import { SmsConsumer } from './consumers/sms.consumer';
import { EmailProvider } from './providers/email.provider';
import { SmsProvider } from './providers/sms.provider';

@Module({
  imports: [RabbitMQModule],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    EmailConsumer,
    // SmsConsumer,
    // WhatsAppConsumer,
    // SystemConsumer,
    EmailProvider,
    // SmsProvider,
    // WhatsAppProvider,
    // SystemProvider,
  ],
})
export class NotificationModule {}
