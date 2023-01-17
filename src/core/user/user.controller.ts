import { Controller, Get } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@Get()
	async getAll() {
		return await this.userService.findBy({});
	}
}
