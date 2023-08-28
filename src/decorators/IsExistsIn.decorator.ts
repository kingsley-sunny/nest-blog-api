import { InternalServerErrorException, Logger } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';
import { BaseRepository } from '../database/base/base.repository';

export function IsExistsIn(
  column: string,
  model: BaseRepository<any>,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsExistsIn',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [column, model],
      options: validationOptions,

      validator: {
        async validate(value: string | number, args: ValidationArguments) {
          return await validate(args, value, propertyName, validationOptions);
        },
      },
    });
  };
}
async function validate(
  args: ValidationArguments,
  value: string | number,
  propertyName: string,
  options: ValidationOptions,
) {
  Logger.log('validate', 'IsExistsIn.Decorator');

  const [column, model] = args.constraints;

  const data = await model.findOne({ [column]: value });

  if (!data) {
    throw new InternalServerErrorException(
      options?.message || `no ${propertyName} with the value ${value} found`,
    );
  }

  return true;
}
