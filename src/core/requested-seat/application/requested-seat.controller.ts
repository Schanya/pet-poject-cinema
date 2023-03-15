import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ReadAllResult } from 'src/common/types/read-all-result.type';

import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';
import { RequestedSeat } from '../domain/requested-seat.entity';

import { RequestedSeatService } from '../domain/requested-seat.service';
import { RequestedSeatDto } from '../presentation/requested-seat.dto';

@Controller('requested-seat')
export class RequestedSeatController {
	constructor(readonly requestedSeatService: RequestedSeatService) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll(): Promise<ReadAllResult<RequestedSeat>> {
		const requestedSeats = await this.requestedSeatService.findAll({});

		return {
			totalRecordsNumber: requestedSeats.totalRecordsNumber,
			entities: requestedSeats.entities,
		};
	}

	@HttpCode(HttpStatus.CREATED)
	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	async create(@Body() requestedSeatDto: RequestedSeatDto, @Request() req) {
		const requestedSeat = await this.requestedSeatService.create(
			requestedSeatDto,
			req.user.id,
		);

		return requestedSeat;
	}
}
