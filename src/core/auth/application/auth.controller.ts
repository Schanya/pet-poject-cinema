import {
	Body,
	Controller,
	HttpStatus,
	Post,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';

import { UserDto } from '../../user/presentation/user.dto';
import { AuthService } from '../domain/auth.service';

import { Response } from 'express';
import { Transaction } from 'sequelize';
import { TransactionParam } from '../../helpers/decorators';
import { TransactionInterceptor } from '../../helpers/interceptors';
import { LocalAuthGuard } from '../guards';

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
