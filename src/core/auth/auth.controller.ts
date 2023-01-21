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
import { TransactionParam } from '../helpers/interceptors/transaction.decarator';
import { Transaction } from 'sequelize';

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
	async registration(
		@Body() userDto: UserDto,
		@TransactionParam() transaction: Transaction,
	) {
		return await this.authService.registration(userDto, transaction);
	}
}
