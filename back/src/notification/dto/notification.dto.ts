import { IsEnum, IsString, IsNotEmpty } from 'class-validator';

export enum NotificationType {
  EMAIL = 'email',
  SMS = 'sms',
  WHATSAPP = 'whatsapp',
  SYSTEM = 'system',
}

export class CreateNotificationDto {
  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
