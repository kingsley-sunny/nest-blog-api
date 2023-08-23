import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const UserEmail = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    Logger.log('UserEmail', 'UserEmail.Decorator');

    const request = ctx.switchToHttp().getRequest();
    return request.user.email;
  },
);
