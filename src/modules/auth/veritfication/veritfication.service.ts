import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TWO_HOURS_IN_MILLISECONDS } from '../../../base/base.constant';
import { FetchQuery } from '../../../database/base/base.interface';
import { IVerificationCode } from '../../../database/models/verificationCode/verificationCode.interface';
import { Public } from '../../../decorators/public.decorator';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { VerificationRepository } from './veritfication.repository';

@Injectable()
export class VerificationService {
  @Inject(VerificationRepository)
  verificationRepository: VerificationRepository;

  @Public()
  async create(data: CreateVerificationDto, userId: number) {
    const { email } = data;
    let verification: IVerificationCode;
    try {
      // TODO - send mail first to the email first

      verification = await this.verificationRepository.create({
        email,
        user_id: userId,
        code: 234334,
        expires_at: Date.now() + TWO_HOURS_IN_MILLISECONDS,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }

    return verification;
  }

  async find(params: FetchQuery) {
    try {
      const verifications = await this.verificationRepository.find({}, params);

      return verifications;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IVerificationCode>) {
    const verification = await this.verificationRepository.findOne(params);

    return verification;
  }

  async findById(id: number) {
    const verification = await this.verificationRepository.findById(id);
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }

    return verification;
  }

  async delete(id: number) {
    return await this.verificationRepository.delete(id);
  }
}
