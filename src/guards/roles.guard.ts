import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IRole } from '../database/models/role/role.interface';
import { UserModel } from '../database/models/user/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log('CancanActivate', 'RolesGuard');

    const req = context.switchToHttp().getRequest();

    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const user: UserModel & { roles?: IRole[] } = await UserModel.query()
      .findOne({ id: req.user.id })
      .withGraphFetched('[roles]');

    const userRoles = user.roles;

    const isUserWithThisRole = userRoles.find((role) =>
      roles.includes(role.title),
    );

    if (!isUserWithThisRole) {
      throw new UnauthorizedException(
        'You are not permitted to access this resource',
      );
    }

    return true;
  }
}
