import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../helpers/decorators';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		try {
			const requiredRoles = this.reflector.getAllAndOverride<string[]>(
				ROLES_KEY,
				[context.getHandler(), context.getClass()],
			);
			if (!requiredRoles) {
				return true;
			}

			return req.user.roles.some((roleName) =>
				requiredRoles.includes(roleName),
			);
		} catch (e) {
			throw new HttpException(e, HttpStatus.FORBIDDEN);
		}
	}
}
