import { SetMetadata } from '@nestjs/common';

export const Public = (value = true) => SetMetadata('public', value);
