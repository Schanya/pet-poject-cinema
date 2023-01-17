import {
	Controller,
	Post,
	Body,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards';
import { TransactionInterceptor } from '../helpers/interceptors/transaction.interceptor';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async login(@Body() userDto: UserDto) {
		return await this.authService.login(userDto);
	}

	@UseInterceptors(TransactionInterceptor)
	@Post('sign-up')
	async registration(@Body() userDto: UserDto) {
		return await this.authService.registration(userDto);
	}
}
