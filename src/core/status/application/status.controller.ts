import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Res,
	UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';

import { StatusService } from '../domain/status.service';
import { StatusDto } from '../presentation/status.dto';

@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('status')
export class StatusController {
	constructor(readonly statusService: StatusService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const statuses = await this.statusService.findAll({});

		res.status(HttpStatus.OK).send(statuses);
	}

	@Post()
	async create(@Body() statusDto: StatusDto, @Res() res: Response) {
		const status = await this.statusService.create(statusDto);

		res
			.status(HttpStatus.OK)
			.send(`Status ${status.name} created successfully`);
	}

	@Put(':id')
	async update(
		@Param('id') id: number,
		@Body() statusDto: StatusDto,
		@Res() res: Response,
	) {
		const updatedStatus = await this.statusService.update(id, statusDto);

		res
			.status(HttpStatus.OK)
			.send(`Status ${updatedStatus.name} updated successfully`);
	}

	@Delete(':id')
	async delete(@Param('id') id: string, @Res() res: Response) {
		await this.statusService.delete(id);

		res.status(HttpStatus.OK).send(`Status deleted successfully`);
	}
}
