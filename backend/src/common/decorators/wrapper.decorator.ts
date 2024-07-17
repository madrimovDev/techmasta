import { Public, Role, Roles } from '../guards';
import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

interface IWrapperDecorator {
  isPublic: true | Role[];
  summary: string[];
}

export const WrapperDecorator = (options: IWrapperDecorator) => {
  if (options.isPublic === true) {
    return applyDecorators(
      ApiOperation({
        summary: options.summary[0],
        description: options.summary[1],
      }),
      Public(),
    );
  }
  if (Array.isArray(options.isPublic)) {
    return applyDecorators(
      ApiOperation({
        summary: options.summary[0],
        description: options.summary[1],
      }),
      ApiBearerAuth(),
      Roles(...options.isPublic),
    );
  }
};
