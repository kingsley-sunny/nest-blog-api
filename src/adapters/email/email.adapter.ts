import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ProviderInjector } from '../../helpers/injectors/ProviderInjector';
import { EmailManagement, EmailSubscriber } from './email.interface';
import { ResendAdapter } from './providers/resend/resend.adapter';

@Injectable()
export class EmailAdapter<T = any> implements EmailManagement {
  @Inject(ProviderInjector.inject([ResendAdapter], ResendAdapter))
  resendAdapter: ResendAdapter;

  templatePath: string;

  async sendMail(
    to: string,
    subject: string,
    message: string,
    config?: T,
  ): Promise<boolean> {
    Logger.log('sendMail', 'EmailAdapter');

    try {
      const isEmailSent = await this.resendAdapter.sendMail(
        to,
        subject,
        message,
      );

      if (!isEmailSent) {
        throw new InternalServerErrorException(
          'Something Went Wrong with sending email',
        );
      }

      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  addSubscriberToList?: (
    subscriberId: string[],
    listKey: string,
  ) => Promise<boolean>;

  checkEmailIsInSpam?: (emailToken: string) => Promise<boolean>;

  createSubscribeList?: (title: string) => Promise<boolean>;

  createSubscriber?: (data: EmailSubscriber) => Promise<string>;

  notify?: <BuildMessage>(data: BuildMessage) => Promise<boolean>;

  updateSubscriber?: (data: EmailSubscriber) => Promise<boolean>;
}
