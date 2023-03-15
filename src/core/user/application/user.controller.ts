import { Controller, Get, UseGuards } from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { JwtAuthGuard } from '../../auth/guards';

import { UserService } from '../../user/domain/user.service';
import { User } from '../domain/user.entity';

@Controller('user')
export class UserController {
	constructor(readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAll(): Promise<ReadAllResult<User>> {
		const users = await this.userService.findAll({});

		return {
			totalRecordsNumber: users.totalRecordsNumber,
			entities: users.entities,
		};
	}
}
