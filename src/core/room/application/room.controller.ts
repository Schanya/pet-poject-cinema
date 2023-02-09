import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Post,
	Delete,
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
		const room = await this.roomService.create(
			roomDto,
			req.user.id,
			transaction,
		);
		res.status(HttpStatus.OK).send(`Room ${room.name} created successfully`);
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@Post('/connection/:id')
	async connection(
		@Param('id') roomId: number,
		@Res() res: Response,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		await this.roomService.connection(req.user.id, transaction, roomId);

		res
			.status(HttpStatus.OK)
			.send(`You have successfully connected to the room`);
	}

	@Roles('USER', 'ADMIN')
	@UseGuards(JwtAuthGuard, RolesGuard)
	@UseInterceptors(TransactionInterceptor)
	@Delete('/disconnection/:id')
	async disconnection(
		@Param('id') roomId: number,
		@Res() res: Response,
		@Req() req,
		@TransactionParam() transaction: Transaction,
	) {
		await this.roomService.disconnection(req.user.id, transaction, roomId);

		res
			.status(HttpStatus.OK)
			.send(`You have successfully disconnected to the room`);
	}
}
