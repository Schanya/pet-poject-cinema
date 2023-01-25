import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { RoleDto } from '../dto';
import { RoleService } from '../services';

@Controller('role')
export class RoleController {
	constructor(readonly roleService: RoleService) {}

	@Post()
	async create(@Body() roleDto: RoleDto, @Res() res: Response) {
		const role = await this.roleService.create(roleDto);

		res.status(HttpStatus.OK).send(`Role ${role.name} created successfully`);
	}
}
