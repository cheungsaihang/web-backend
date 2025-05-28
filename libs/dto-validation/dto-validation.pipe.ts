import { BadRequestException, Injectable, ValidationError, ValidationPipe } from '@nestjs/common';

@Injectable()
export class DTOValidationPipe extends ValidationPipe {
  constructor(){
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map((err) => {
          const property = err.property;
          const first = Object.keys(err.constraints)[0];
          const short = property + (first == "isNotEmpty" ? "_is_empty" : "_is_invalid");
          return {
            key:property,
            short:short,
            long: err.constraints[first]
          }
        });
        throw new BadRequestException(messages);
      }
    });
  }
}