import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  Type,
} from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class SchemaValidationPipe<T> implements PipeTransform<T> {
  async transform(value: T, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new ApolloError('Los datos ingresados son incorrectos', '422', {
        errors,
      });
    }

    return value;
  }

  private toValidate(metatype: Type<T>): boolean {
    const types: Type[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
}
