import { Injectable } from '@nestjs/common';
import twilio from 'twilio';

@Injectable()
export class SmsProvider {
  private client = twilio('TWILIO_ACCOUNT_SID', 'TWILIO_AUTH_TOKEN');

  async sendNotification(to: string, message: string): Promise<void> {
    await this.client.messages.create({
      body: message,
      from: '+1234567890', // Your Twilio number
      to,
    });

    console.log(`📲 SMS sent to ${to}`);
  }
}
