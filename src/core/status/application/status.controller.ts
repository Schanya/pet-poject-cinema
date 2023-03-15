import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
	UseGuards,
} from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';
import { Status } from '../domain/status.entity';

import { StatusService } from '../domain/status.service';
import { StatusDto } from '../presentation/status.dto';

@Roles('ADMIN')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('status')
export class StatusController {
	constructor(readonly statusService: StatusService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<Status>> {
		const statuses = await this.statusService.findAll({});

		return {
			totalRecordsNumber: statuses.totalRecordsNumber,
			entities: statuses.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() statusDto: StatusDto) {
		const status = await this.statusService.create(statusDto);

		return status;
	}

	@HttpCode(HttpStatus.OK)
	@Put(':id')
	async update(@Param('id') id: number, @Body() statusDto: StatusDto) {
		const updatedStatus = await this.statusService.update(id, statusDto);

		return updatedStatus;
	}

	@HttpCode(HttpStatus.OK)
	@Delete(':id')
	async delete(@Param('id') id: string) {
		await this.statusService.delete(id);

		return `Status deleted successfully`;
	}
}
