import {
	Body,
	Controller,
	HttpStatus,
	Post,
	Res,
	UseGuards,
	Request,
	Get,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles } from '../../helpers/decorators';

import { RequestedSeatDto } from '../dto';
import { RequestedSeatService } from '../services';

@Controller('requested-seat')
export class RequestedSeatController {
	constructor(readonly requestedSeatService: RequestedSeatService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const requestedSeats = await this.requestedSeatService.findAll({});

		res.status(HttpStatus.OK).send(requestedSeats);
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@Post()
	async create(
		@Body() requestedSeatDto: RequestedSeatDto,
		@Res() res: Response,
		@Request() req,
	) {
		const requestedSeat = await this.requestedSeatService.create(
			requestedSeatDto,
			req.user.id,
		);

		res
			.status(HttpStatus.OK)
			.send({ message: 'Seat reserved successfully', requestedSeat });
	}
}
