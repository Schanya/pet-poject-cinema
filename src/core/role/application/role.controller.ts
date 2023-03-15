import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { RoleService } from '../domain/role.service';
import { RoleDto } from '../presentation/role.dto';

@Controller('role')
export class RoleController {
	constructor(readonly roleService: RoleService) {}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() roleDto: RoleDto) {
		const role = await this.roleService.create(roleDto);

		return role;
	}
}
