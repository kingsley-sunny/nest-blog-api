import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SALTS_ROUNDS } from '../base/base.constant';

@Injectable()
export class UtilsService {
  /**
   * hashPassword
   */
  public static async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, SALTS_ROUNDS);

    return hashedPassword;
  }

  /**
   * comparePassword
   */
  public static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    return isPasswordMatch;
  }
}
