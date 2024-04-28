import { ROLE } from '.prisma/client';
import { CanActivate, ForbiddenException, Injectable, mixin, Type, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { authConfig } from '@/config/auth.config';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

const { access_token_secret_key } = authConfig();


export const RoleGuard = (roles: ROLE[]): Type<CanActivate> => {

  @Injectable()
  class RoleGuardMixin implements CanActivate {
    constructor(private jwtService: JwtService) {
    }

    async canActivate(context: ExecutionContextHost): Promise<boolean> {
      const request = context.getArgs()[2].req || { headers: context.getArgs()[0].headers };
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token,
          { secret: access_token_secret_key },
        );

        // 💡 We're assigning the payload to the request object here
        // so that we can access it in our route handlers
        request['user'] = payload;

      } catch {
        throw new UnauthorizedException();
      }

      if (roles.length && !roles.includes(request.user.role)) {
        throw new ForbiddenException('You do not have permission to access this resource');
      }

      return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request?.headers?.authorization?.split(' ') || [];
      return type === 'Bearer' ? token : undefined;
    }
  }

  return mixin(RoleGuardMixin);
};
