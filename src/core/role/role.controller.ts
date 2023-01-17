import { Controller, Post, Body } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
	constructor(readonly roleService: RoleService) {}

	@Post()
	async create(@Body() roleDto: RoleDto) {
		return await this.roleService.create(roleDto);
	}
}
