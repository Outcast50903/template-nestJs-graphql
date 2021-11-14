import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  // eslint-disable-next-line
  getRequest(context: ExecutionContext): object {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req;
  }
}
