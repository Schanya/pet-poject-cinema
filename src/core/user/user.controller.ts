import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAll() {
		return await this.userService.findBy({});
	}
}
