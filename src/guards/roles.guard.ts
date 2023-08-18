import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('🚀 ~~ file: roles.guard.ts:20 ~~ RolesGuard ~~ roles:', roles);

    console.log(context.getHandler());

    if (!request.body) {
      throw new InternalServerErrorException('I am nacking right now');
    }

    return true;
  }
}
