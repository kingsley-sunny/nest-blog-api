import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    Logger.log('UserId', 'UserId.Decorator');

    const request = ctx.switchToHttp().getRequest();
    return request.user.id;
  },
);
