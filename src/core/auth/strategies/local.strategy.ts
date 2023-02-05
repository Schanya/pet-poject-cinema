import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../domain/auth.service';
import { UserDto } from 'src/core/user/presentation/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({ usernameField: 'email', passwordField: 'password' });
	}

	async validate(email: string, password: string): Promise<any> {
		const user = await this.authService.validateUser({ email, password });

		if (!user) throw new UnauthorizedException('Incorrect email or password');

		return user;
	}
}
