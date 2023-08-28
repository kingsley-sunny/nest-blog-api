import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';
import { EnvironmentService } from '../../../../config';

@Injectable()
export class ResendAdapter {
  private resend = new Resend(EnvironmentService.getValue('resendApiKey'));

  public static isActive = true;

  async sendMail(
    to: string,
    subject: string,
    message: string,
    config?: any,
  ): Promise<boolean> {
    Logger.log('sendMail', 'ResendAdapter');
    try {
      const sentMail = await this.resend.emails.send({
        from: 'blog_app@resend.dev',
        to: 'delivered@resend.dev', // TODO: Change the mail during production to the user's email
        subject,
        html: message,
      });

      if (!sentMail.id) {
        Logger.error(sentMail, 'ResendAdapter');
        return false;
      }

      return true;
    } catch (error) {}
  }
}
