import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { EmailAdapter } from '../../../adapters/email/email.adapter';
import { TWO_HOURS_IN_MILLISECONDS as ONE_HOUR_IN_MILLISECONDS } from '../../../base/base.constant';
import { FetchQuery } from '../../../database/base/base.interface';
import { IResetPasswordCode } from '../../../database/models/resetPasswordCode/resetPasswordCode.interface';
import { UtilsService } from '../../../utils/utils.service';
import { UserRepository } from '../../user';
import { CreateNewPasswordDto } from './dto/create-new-password.dto';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { ResetPasswordRepository } from './reset-password.repository';

@Injectable()
export class ResetPasswordService {
  @Inject(ResetPasswordRepository)
  resetPasswordRepository: ResetPasswordRepository;
  @Inject(EmailAdapter)
  emailAdapter: EmailAdapter;
  @Inject(UserRepository)
  userRepository: UserRepository;

  async create(data: CreateResetPasswordDto) {
    const { email } = data;
    const uniqueId = randomUUID();

    try {
      const emailMessage = UtilsService.getResetPasswordEmailTemplate(uniqueId);

      const isEmailSent = await this.emailAdapter.sendMail(
        email,
        'Password Reset Request',
        emailMessage,
      );

      if (isEmailSent) {
        await this.resetPasswordRepository.create({
          email,
          expires_at: UtilsService.convertToMySqlDateFormat(
            Date.now() + ONE_HOUR_IN_MILLISECONDS,
          ),
          unique_id: uniqueId,
        });
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { success: true };
  }

  async createNewPassword(data: CreateNewPasswordDto) {
    const { password, unique_id } = data;
    const currentTime = new Date();

    const resetPasswordDetails = await this.resetPasswordRepository
      .findOne({
        unique_id,
        is_used: false,
      })
      .andWhere('expires_at', '>', currentTime);

    if (!resetPasswordDetails) {
      throw new BadRequestException('This link has expired ');
    }

    const hashedPassword = await UtilsService.hashPassword(password);

    try {
      const isUpdated = await this.userRepository.update(
        { email: resetPasswordDetails.email },
        { password: hashedPassword },
      );

      if (isUpdated) {
        this.resetPasswordRepository.update(resetPasswordDetails.id, {
          is_used: true,
        });
      }
    } catch (error) {
      Logger.error(error.message, 'ResetPasswordService');
      throw new InternalServerErrorException('Something went wrong');
    }

    return { success: true };
  }

  async find(params: FetchQuery) {
    try {
      const resetPasswords = await this.resetPasswordRepository.find(
        {},
        params,
      );

      return resetPasswords;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IResetPasswordCode>) {
    const resetPassword = await this.resetPasswordRepository.findOne(params);

    return resetPassword;
  }

  async findById(id: number) {
    const resetPassword = await this.resetPasswordRepository.findById(id);
    if (!resetPassword) {
      throw new NotFoundException('ResetPassword not found');
    }

    return resetPassword;
  }

  async delete(id: number) {
    return await this.resetPasswordRepository.delete(id);
  }
}
