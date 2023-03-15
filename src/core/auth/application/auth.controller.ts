import {
	Body,
	Controller,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { UserDto } from '../../user/presentation/user.dto';
import { AuthService } from '../domain/auth.service';

import { Transaction } from 'sequelize';
import { TransactionParam } from '../../helpers/decorators';
import { TransactionInterceptor } from '../../helpers/interceptors';
import { LocalAuthGuard } from '../guards';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async login(@Body() userDto: UserDto) {
		const token = await this.authService.login(userDto);

		return token;
	}

	@HttpCode(HttpStatus.OK)
	@UseInterceptors(TransactionInterceptor)
	@Post('sign-up')
	async registration(
		@Body() userDto: UserDto,
		@TransactionParam() transaction: Transaction,
	) {
		const user = await this.authService.registration(userDto, transaction);

		return user;
	}
}
