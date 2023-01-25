import {
	Controller,
	Post,
	Body,
	UseGuards,
	UseInterceptors,
	Res,
	HttpStatus,
} from '@nestjs/common';

import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guards';
import { TransactionInterceptor } from '../helpers/interceptors';
import { TransactionParam } from '../helpers/decorators';
import { Transaction } from 'sequelize';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('sign-in')
	async login(@Body() userDto: UserDto, @Res() res: Response) {
		const token = await this.authService.login(userDto);

		res.status(HttpStatus.OK).send(token);
	}

	@UseInterceptors(TransactionInterceptor)
	@Post('sign-up')
	async registration(
		@Body() userDto: UserDto,
		@TransactionParam() transaction: Transaction,
		@Res() res: Response,
	) {
		const user = await this.authService.registration(userDto, transaction);

		res
			.status(HttpStatus.OK)
			.send(`User ${user.email} registered successfully`);
	}
}
