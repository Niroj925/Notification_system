import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { RabbitMQModule } from './notification/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NotificationModule, 
    RabbitMQModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
