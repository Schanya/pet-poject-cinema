import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard } from '../../auth/guards';

import { UserService } from '../services';

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAll(@Res() res: Response) {
		const users = await this.userService.findAll({});

		res.status(HttpStatus.OK).send(users);
	}
}
