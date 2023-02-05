import {
	Body,
	Controller,
	Delete,
	Get,
	HttpStatus,
	Param,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Transaction } from 'sequelize';

import { TransactionInterceptor } from 'src/core/helpers/interceptors';
import { JwtAuthGuard, RolesGuard } from '../../auth/guards';
import { Roles, TransactionParam } from '../../helpers/decorators';

import { RoomService } from '../domain/room.service';
import { RoomDto } from '../presentation/room.dto';

@Controller('room')
export class RoomController {
	constructor(readonly roomService: RoomService) {}

	@Get()
	async getAll(@Res() res: Response) {
		const rooms = await this.roomService.findAll({});

		res.status(HttpStatus.OK).send(rooms);
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@Post()
	async create(
		@Body() roomDto: RoomDto,
		@Res() res: Response,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		//const room = await this.roomService.create(roomDto, userId, transaction);
		//res.status(HttpStatus.OK).send(`Room ${room.name} created successfully`);
	}
}
