import { Controller, Post, Body } from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('sign-in')
	async login(@Body() userDto: UserDto) {
		return await this.authService.login(userDto);
	}

	@Post('sign-up')
	async registration(@Body() userDto: UserDto) {
		return await this.authService.registration(userDto);
	}
}
